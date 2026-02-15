import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    typescript: true,
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items } = body;

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'No items in checkout' }, { status: 400 });
        }

        // Calculate total from database to prevent client-side price manipulation
        let total = 0;
        const orderItemsData = [];

        for (const item of items) {
            const product = await prisma.product.findUnique({
                where: { id: item.id },
            });

            if (!product) {
                continue;
            }

            total += product.price * item.quantity;
            orderItemsData.push({
                price: product.price, // Storing price at time of purchase would be good in OrderItem model, but current model doesn't have it.
                quantity: item.quantity,
                productId: product.id,
            });
        }

        // Create Order in DB
        const order = await prisma.order.create({
            data: {
                total,
                status: 'pending',
                items: {
                    create: orderItemsData.map((item) => ({
                        product: { connect: { id: item.productId } },
                        quantity: item.quantity
                    }))
                }
            }
        });

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(total * 100), // Stripe expects cents
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                orderId: order.id,
                integration_check: 'accept_a_payment',
            },
        });

        // Update Order with PaymentIntent ID
        await prisma.order.update({
            where: { id: order.id },
            data: { stripePaymentId: paymentIntent.id }
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            total,
        });
    } catch (error: any) {
        console.error('Stripe error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

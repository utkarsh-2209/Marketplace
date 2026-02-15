const { PrismaClient } = require('@prisma/client')
require('dotenv').config()

const prisma = new PrismaClient()

async function main() {
    const products = [
        {
            name: 'Minimalist Leather Watch',
            description: 'A premium leather watch with a minimalist design. Features a genuine leather strap and a stainless steel case. Water-resistant up to 50m.',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
            name: 'Wireless Noise-Cancelling Headphones',
            description: 'Experience pure sound with our top-of-the-line wireless headphones. Active noise cancellation and 30-hour battery life.',
            price: 349.50,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
            name: 'Smart Home Speaker',
            description: 'Voice-controlled smart speaker with premium audio quality. Fits perfectly in any modern home.',
            price: 129.00,
            image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
        {
            name: 'Designer Sunglasses',
            description: 'Handcrafted sunglasses with polarized lenses. UV400 protection.',
            price: 159.95,
            image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        },
    ]

    console.log('Start seeding ...')
    for (const product of products) {
        // Check if product exists to avoid duplicates if re-run
        const existing = await prisma.product.findFirst({ where: { name: product.name } })
        if (!existing) {
            const p = await prisma.product.create({
                data: product,
            })
            console.log(`Created product with id: ${p.id}`)
        } else {
            console.log(`Skipping ${product.name}, already exists.`)
        }
    }
    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

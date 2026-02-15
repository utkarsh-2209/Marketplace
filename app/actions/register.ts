'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export async function registerUser(formData: FormData) {
    const validatedFields = RegisterSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return { error: 'Invalid fields' };
    }

    const { email, password } = validatedFields.data;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return { error: 'Email already in use' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    redirect('/login');
}

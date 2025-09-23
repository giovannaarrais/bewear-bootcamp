"use server"

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { db } from '@/db';
import { shippingAddressTable } from '@/db/schema';
import { auth } from '@/lib/auth';

import { CreateShippingAddressSchema, createShippingAddressSchema } from './schema';

export const createShippingAddress = async (data: CreateShippingAddressSchema) => {
    createShippingAddressSchema.parse(data);

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if(!session?.user) {
        throw new Error("Unauthorized")
    }

    // inserindo dados do endereço na table
    const [shippingAdress] = await db
        .insert(shippingAddressTable)
        .values({
            userId: session.user.id,
            recipientName: data.fullName,
            street: data.address,
            number: data.number,
            complement: data.complement || null,
            city: data.city,
            state: data.state,
            neighborhood: data.neighborhood,
            zipCode: data.zipCode,
            country: "Brasil",
            phone: data.phone,
            email: data.email,
            cpfOrCnpj: data.cpf,
        })
        .returning();

    // esquema para limpar cache do server component q chama esse use serve
    revalidatePath("/cart/identification")
    
    return shippingAdress
}
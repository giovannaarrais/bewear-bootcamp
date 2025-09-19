"use server";

import { eq } from 'drizzle-orm';
import { headers } from "next/headers";

import { db } from '@/db';
import { shippingAddressTable } from '@/db/schema';
import { auth } from "@/lib/auth";

export async function getUserAddresses() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })


    if(!session?.user.id) {
        throw new Error("Unauthorized");
    }

    // capturar endereços cadastrados
    try {
        const addresses = await db
            .select()
            .from(shippingAddressTable)
            .where(eq(shippingAddressTable.userId, session.user.id))
            .orderBy(shippingAddressTable.createdAt)

            // seleciona os dados da tabela de endereço,
            // onde o id do endereço é o mesmo do user da sessao
            // ordenando pela sua data de adicao

        return addresses;

    } catch (error) {
        console.log("Nao foi possivel realizar a busca de endereços. ", error);
        throw new Error("Não foi possivel buscar endereços");
    }
} 
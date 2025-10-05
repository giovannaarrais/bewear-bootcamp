"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { RemoveAddressSchema, removeAddressSchema } from "./schema";

export const removeAddress = async (data: RemoveAddressSchema) => {
    removeAddressSchema.parse(data)

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session?.user) {
        throw new Error("Unauthorized")
    }

    const shippingAddress = await db.query.shippingAddressTable.findFirst({
        where: eq(shippingAddressTable.id, data.shippingAddressId)
    })

    if(!shippingAddress) {
        throw new Error("Address not found")
    }

    if(shippingAddress.userId != session.user.id){
        throw new Error("Unauthorized")
    }

    if (shippingAddress) {
        await db.delete(shippingAddressTable).where(eq(shippingAddressTable.id, data.shippingAddressId))
    }
};

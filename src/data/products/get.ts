import "server-only"; // so permite importar as nossas funcoes em server components

import { desc } from "drizzle-orm";

import { db } from "@/db"
import { productTable } from "@/db/schema";

// DTO (Data Tranfers Object)
// interface Product{
//     id: string,
//     name: string,
//     description: string,
//     price: number,
//     image: string,
//     category: string,
//     createdAt: Date;
// }

export const getProducts = async () => {
    const products = await db.query.productTable.findMany({
        with: {
            variants: true
        }
    })
    return products;
}

// ordernacao decrescente das datas de criacao da table de produtos
export const getNewlyCreatedProducts = async () => {
    const newlyCreatedProducts = await db.query.productTable.findMany({
        orderBy: [desc(productTable.createdAt)],
        limit: 4,
        with: {
        variants: true
        }
    })
    return newlyCreatedProducts
}
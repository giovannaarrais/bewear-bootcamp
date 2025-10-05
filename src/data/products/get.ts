import "server-only"; // so permite importar as nossas funcoes em server components

import { desc, eq } from "drizzle-orm";

import { db } from "@/db"
import { productTable, productVariantTable } from "@/db/schema";

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

// tras as variantes do produto
export const getProductsWithVariants = async (slug: string) => {
    const productVariant = await db.query.productVariantTable.findFirst({
        where: eq(productVariantTable.slug, slug),
        with: {
            // e tras o produto a qm essa variante pertence e as variantes desse
            product: {
                with: {
                    variants: true
                }
            }
        }
    });
    return productVariant;
}

// captura os produtos dessa mesma categoria que pertence ao produto visualizado
export const getLikelyProducts = async (productVariant: string) => {
    const likelyProducts = await db.query.productTable.findMany({
        where: eq(productTable.categoryId, productVariant),
        with: {
            variants: true
        }
    })
    return likelyProducts;
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
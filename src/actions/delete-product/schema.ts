import z, { string } from "zod";

export const deleteProductSchema = z.object({
    productId: string()
})
export type DeleteProductSchema = z.infer<typeof deleteProductSchema >


export const deleteProductVariantSchema = z.object({
    productId: string()
})
export type DeleteProductVariantSchema = z.infer<typeof deleteProductVariantSchema >
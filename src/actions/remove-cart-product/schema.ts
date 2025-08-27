import z from "zod";

export const removeProductFromCartSchema = z.object({
    cartItemId: z.uuid(),
})  

export type removeProductFromCartSchema = z.infer<typeof removeProductFromCartSchema>
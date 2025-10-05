import z from "zod"

export const removeAddressSchema = z.object({
    shippingAddressId: z.uuid(),
})
export type RemoveAddressSchema = z.infer<typeof removeAddressSchema>
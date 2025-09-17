import z from "zod";

export const createShippingAddressSchema = z.object({
    email: z.email("E-mail inválido"),
    fullName: z.string().min(1, "Nome completo é obrigatório"),
    cpf: z.string().min(14, 'CPF Inválido'),
    phone: z.string().min(1, 'Celular obrigatório'),
    zipCode: z.string().min(8, "CEP Inválido"),
    address: z.string().min(1, "Endereço é obrigatório"),
    number: z.string().min(1, "Número obrigatório"),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, "Bairro é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatório"),
    state: z.string().min(1 , "Estado é obrigatório")
})

export type CreateShippingAddressSchema = z.infer<
    typeof createShippingAddressSchema
>

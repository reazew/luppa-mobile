import { z } from 'zod'

export const clientOrCompanySchema = z.object({
  type: z.enum(['client', 'company'], {
    required_error: 'Por favor, selecione um tipo de cadastro',
  }),
})

export const registerClientSchema = z.object({
  imageFile: z.array(z.instanceof(File)).nullish(),
  imageUrl: z.string().nullish(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(11),
  birthDate: z.string().min(1),
})

export const registerCompanySchema = z.object({
  imageFile: z.array(z.instanceof(File)).nullish(),
  imageUrl: z.string().nullish(),
  name: z.string().min(1),
  cpf: z.string().min(11),
  email: z.string().email(),
  phone: z.string().min(11),
  birthDate: z.string().min(1),
})

export type RegisterClientInfer = z.infer<typeof registerClientSchema>
export type RegisterCompanyInfer = z.infer<typeof registerCompanySchema>

export type clientOrCompanyInfer = z.infer<typeof clientOrCompanySchema>

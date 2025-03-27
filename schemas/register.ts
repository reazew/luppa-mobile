import { z } from 'zod'

export const clientOrCompanySchema = z.object({
  type: z.enum(['client', 'company'], {
    required_error: 'Por favor, selecione um tipo de cadastro',
  }),
})

export const registerSchema = z.object({
  imageFile: z.array(z.instanceof(File)).nullish(),
  imageUrl: z.string().nullish(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(11),
  birthDate: z.string().min(1),
})

export type RegisterInfer = z.infer<typeof registerSchema>

export type clientOrCompanyInfer = z.infer<typeof clientOrCompanySchema>

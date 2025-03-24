import { z } from 'zod'

export const registerSchema = z.object({
  type: z.enum(['client', 'company']),
  paymentMethod: z.enum(['pix', 'credit-card', 'debit-card']),
  imageFile: z.array(z.instanceof(File)).nullish(),
  imageUrl: z.string().nullish(),
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  phone: z.string().min(11),
  city: z.string().min(1),
  uf: z.string().min(2),
  birthDate: z.string().min(1),
})

export type RegisterInfer = z.infer<typeof registerSchema>

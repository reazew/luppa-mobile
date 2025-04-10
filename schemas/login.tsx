import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
})

export type LoginSchemaInfer = z.infer<typeof loginSchema>

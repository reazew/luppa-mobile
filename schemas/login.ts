import { z } from 'zod'

export const sendCodeSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
})

export const validateCodeSchema = z.object({
  code: z.string().min(6, { message: 'Código inválido' }),
})

export type SendCodeSchemaInfer = z.infer<typeof sendCodeSchema>
export type ValidateCodeSchemaInfer = z.infer<typeof validateCodeSchema>

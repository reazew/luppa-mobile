import { z } from 'zod'

export const sendCodeSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
})

export type SendCodeSchemaInfer = z.infer<typeof sendCodeSchema>

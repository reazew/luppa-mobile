import * as ImagePicker from 'expo-image-picker'
import { cpfValidation } from 'lib/helpers/cpf-validation'
import { z } from 'zod'

export const clientOrBusinessSchema = z.object({
  type: z
    .string()
    .min(1, { message: 'Por favor, selecione um tipo de cadastro' })
    .refine((val) => ['client', 'business'].includes(val), {
      message: 'Por favor, selecione um tipo de cadastro válido',
    }),
})

export const registerClientSchema = z.object({
  imageFile: z.array(z.custom<ImagePicker.ImagePickerAsset>()).optional(),
  imageUrl: z.string().optional(),
  name: z
    .string()
    .min(1, {
      message: 'O nome é obrigatório',
    })
    .min(3, {
      message: 'O nome deve ter pelo menos 3 caracteres',
    }),
  cpf: z
    .string()
    .min(1, { message: 'O CPF é obrigatório' })
    .min(11, { message: 'CPF inválido' })
    .refine((cpf) => cpfValidation(cpf), {
      message: 'CPF inválido',
    }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email obrigatório' })
    .email({ message: 'E-mail digitado inválido' }),
  phone: z
    .string()
    .min(1, {
      message: 'O telefone é obrigatório',
    })
    .min(11, {
      message: 'O telefone deve ter pelo menos 11 dígitos, incluindo DDD',
    }),
  birthDate: z
    .string()
    .min(1, {
      message: 'A data de nascimento é obrigatória',
    })
    .min(5, {
      message: 'Por favor, insira uma data de nascimento válida',
    }),
})

export type clientOrBusinessInfer = z.infer<typeof clientOrBusinessSchema>
export type RegisterClientInfer = z.infer<typeof registerClientSchema>

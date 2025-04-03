import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import { cnpjValidation } from 'lib/helpers/cnpj-validation'
import { cpfValidation } from 'lib/helpers/cpf-validation'
import { z } from 'zod'

export const registerBusinessSchema = z.object({
  imageFile: z
    .array(z.custom<ImagePicker.ImagePickerAsset>())
    .min(1, { message: 'É necessário enviar a logo da empresa' }),
  imageUrl: z.string().nullish(),
  nameBusiness: z
    .string()
    .min(1, { message: 'O nome da empresa é obrigatório' })
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
  cnpj: z
    .string()
    .min(1, { message: 'O CNPJ é obrigatório' })
    .min(14, { message: 'O CNPJ deve ter 14 dígitos' })
    .refine((cnpj) => cnpjValidation(cnpj), {
      message: 'CNPJ inválido',
    }),
  segment: z.string().min(1, { message: 'O segmento é obrigatório' }),
  address: z.string().min(1, { message: 'O endereço é obrigatório' }),
  city: z.string().min(1, { message: 'A cidade é obrigatória' }).nullable(),
  state: z.string().min(1, { message: 'O estado é obrigatório' }).nullable(),
  cep: z
    .string()
    .min(1, { message: 'O CEP é obrigatório' })
    .min(8, { message: 'O CEP deve ter 8 dígitos' }),
})

export const registerBusinessGallerySchema = z.object({
  description: z
    .string()
    .min(1, { message: 'A descrição é obrigatória' })
    .min(3, { message: 'A descrição deve ter pelo menos 3 caracteres' }),
  galleryImagesFiles: z
    .array(z.custom<ImagePicker.ImagePickerAsset>())
    .min(1, { message: 'É necessário enviar pelo menos uma imagem' })
    .max(6, { message: 'Máximo de 6 imagens permitidas' }),
  galleryImagesUrls: z.array(z.string()).default([]),
})

export const registerLegalResponsibleSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'O nome é obrigatório' })
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
  cpf: z
    .string()
    .min(1, { message: 'O CPF é obrigatório' })
    .min(14, { message: 'CPF inválido' })
    .refine((cpf) => cpfValidation(cpf), {
      message: 'CPF inválido',
    }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email obrigatório' })
    .email({ message: 'E-mail digitado inválido' }),
  phone: z.string().min(1, { message: 'O telefone é obrigatório' }).min(15, {
    message: 'O telefone deve ter pelo menos 11 dígitos, incluindo DDD',
  }),
  file: z
    .custom<DocumentPicker.DocumentPickerResult>()
    .refine(
      (result) => result && !result.canceled && result.assets.length > 0,
      { message: 'Arquivo é obrigatório' }
    ),
})

const statusSchema = z.object({
  minimumPoints: z.string().min(1, {
    message: 'A quantidade mínima de pontos é obrigatória',
  }),
  description: z.string().min(1, {
    message: 'A descrição dos benefícios é obrigatória',
  }),
  pointsDecrement: z.string().min(1, {
    message: 'A quantidade de pontos a ser decrementada é obrigatória',
  }),
})

export const registerBusinessStatusSchema = z.object({
  status: z.object({
    diamond: statusSchema,
    gold: statusSchema,
    silver: statusSchema,
  }),
})

export type Status = z.infer<typeof statusSchema>
export type RegisterBusinessStatusInfer = z.infer<
  typeof registerBusinessStatusSchema
>
export type RegisterBusinessInfer = z.infer<typeof registerBusinessSchema>
export type RegisterLegalResponsibleInfer = z.infer<
  typeof registerLegalResponsibleSchema
>
export type RegisterBusinessGalleryInfer = z.infer<
  typeof registerBusinessGallerySchema
>

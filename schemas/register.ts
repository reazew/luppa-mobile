import { z } from 'zod'

export const clientOrBusinessSchema = z.object({
  type: z.enum(['client', 'business'], {
    required_error: 'Por favor, selecione um tipo de cadastro',
  }),
})

export const registerClientSchema = z.object({
  imageFile: z.array(z.instanceof(File)).nullish(),
  imageUrl: z.string().nullish(),
  name: z.string().min(1),
  email: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .email({ message: 'E-mail digitado invalido' }),
  phone: z.string().min(11),
  birthDate: z.string().min(1),
})

export const registerBusinessSchema = z.object({
  imageFile: z.array(z.instanceof(File)).nullish(),
  imageUrl: z.string().nullish(),
  nameBusiness: z.string().min(1),
  cnpj: z.string().min(11),
  email: z.string().email(),
  phone: z.string().min(11),
  cep: z.string().min(8),
  address: z.string().min(1),
  segment: z.enum(['Pizzaria', 'Padaria', 'Lanchonete', 'Bar', 'Outros'], {
    required_error: 'Selecione um segmento',
  }),
  city: z.string().min(1),
  uf: z.string().min(2),
})

export const registerLegalResponsibleSchema = z.object({
  imageFile: z.array(z.instanceof(File)).nullish(),
  imageUrl: z.string().nullish(),
  name: z.string().min(1),
  cpf: z.string().min(11),
  email: z.string().email(),
  phone: z.string().min(11),
  birthDate: z.string().min(1),
  document: z.instanceof(File).nullish(),
})

export const registerBusinessGallerySchema = z.object({
  description: z.string().min(1),
  galleryImagesFiles: z.array(z.instanceof(File)).nullish(),
  galleryImagesUrls: z.array(z.string()).default([]),
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
export type RegisterClientInfer = z.infer<typeof registerClientSchema>
export type RegisterBusinessInfer = z.infer<typeof registerBusinessSchema>
export type RegisterLegalResponsibleInfer = z.infer<
  typeof registerLegalResponsibleSchema
>
export type clientOrBusinessInfer = z.infer<typeof clientOrBusinessSchema>
export type RegisterBusinessGalleryInfer = z.infer<
  typeof registerBusinessGallerySchema
>

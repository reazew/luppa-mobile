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
  nameCompany: z.string().min(1),
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

export const registerCompanyGallerySchema = z.object({
  description: z.string().min(1),
  galleryImagesFiles: z.array(z.instanceof(File)).nullish(),
  galleryImagesUrls: z.array(z.string()).default([]),
})

export type RegisterClientInfer = z.infer<typeof registerClientSchema>
export type RegisterCompanyInfer = z.infer<typeof registerCompanySchema>
export type RegisterLegalResponsibleInfer = z.infer<
  typeof registerLegalResponsibleSchema
>
export type clientOrCompanyInfer = z.infer<typeof clientOrCompanySchema>
export type RegisterCompanyGalleryInfer = z.infer<
  typeof registerCompanyGallerySchema
>

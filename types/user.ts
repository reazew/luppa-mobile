export type User = {
  type: 'client' | 'business'
  name?: string
  email?: string
  phone?: string
  cpf?: string
  birthDate?: string
  document?: File | null
  imageUrl?: string
  logoUrl?: string
  nameBusiness?: string
  cnpj?: string
  segment?: string
  galleryImagesUrls?: string[]
  description?: string
  address?: string
  city?: string | null
  state?: string | null
  cep?: string
}

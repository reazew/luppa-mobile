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
  status?: {
    diamond: {
      minimumPoints?: string
      decrementPoints?: string
      expirationTime?: string
      description?: string
    }
    gold: {
      minimumPoints?: string
      decrementPoints?: string
      expirationTime?: string
      description?: string
    }
    silver: {
      minimumPoints?: string
      decrementPoints?: string
      expirationTime?: string
      description?: string
    }
  }
}

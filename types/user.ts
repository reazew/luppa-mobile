export type User = {
  type: 'client' | 'business'
  name: string
  email?: string
  phone?: string
  birthDate?: string
  imageUrl?: string
  logoUrl?: string
  cpf?: string
  document?: File | null
  nameBusiness?: string
  cnpj?: string
  segment?: string
  address?: string
  city?: string | null
  state?: string | null
  cep?: string
}

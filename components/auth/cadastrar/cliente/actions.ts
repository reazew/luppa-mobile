import { api } from 'lib/axios'
import type { RegisterClientInfer } from 'schemas/register-client'

export async function createClient(data: RegisterClientInfer) {
  const response = await api.post(`/user`, {
    name: data.name,
    cpf: data.cpf,
    email: data.email,
    phone: data.phone,
    birthDate: data.birthDate,
    imageUrl: data.imageUrl || undefined,
    role: data.role,
  })
  console.log('Resposta da API:', response.data)
  return response.data
}

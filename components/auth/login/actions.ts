import { api } from 'lib/axios'
import type { SendCodeSchemaInfer } from 'schemas/login'

export async function sendVerificationCode(data: SendCodeSchemaInfer) {
  const response = await api.post(`/login`, {
    email: data.email,
  })
  return response.data
}

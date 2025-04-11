import { api } from 'lib/axios'
import type {
  SendCodeSchemaInfer,
  ValidateCodeSchemaInfer,
} from 'schemas/login'

export async function sendVerificationCode(data: SendCodeSchemaInfer) {
  const response = await api.post(`/login`, {
    email: data.email,
  })
  console.log('Resposta da API:', response.data)
  return response.data
}

export async function validateCodeLogin(
  email: string,
  data: ValidateCodeSchemaInfer
) {
  const response = await api.post(`/confirmCode`, {
    email,
    code: data.code,
  })
  return response.data
}

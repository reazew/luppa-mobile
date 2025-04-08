import type { RegisterClientInfer } from 'schemas/register-client'

export interface CreateClientResponse {
  token: string
  userId: string
  type: 'client'
}

export async function createClientAction(
  data: RegisterClientInfer
): Promise<CreateClientResponse> {
  // Futura implementação da API
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    token: 'mock-token-123',
    userId: 'client-123',
    type: 'client' as const,
  }
}

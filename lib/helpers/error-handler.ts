import { AxiosError } from 'axios'

export const errorHandler = (
  error: AxiosError<{ error?: string; message?: string }>
) => {
  alert(
    error.response?.data.error ||
      error.response?.data.message ||
      error?.message ||
      'Erro interno de servidor!'
  )
  console.log(error)
}

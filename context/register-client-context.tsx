'use client'

import { FormProvider, useForm } from 'react-hook-form'

export type RegisterClientFormProps = {
  type: string
  name: string
  email: string
  phone: string
  birthDate: string
  imageFile: File[] | null
}

type RegisterClientFormProviderProps = {
  children: React.ReactNode
}

export function RegisterClientFormProvider({ children }: RegisterClientFormProviderProps) {
  const methods = useForm<RegisterClientFormProps>({
    defaultValues: {
      type: '',
      name: '',
      email: '',
      phone: '',
      birthDate: '',
      imageFile: null,
    },
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}

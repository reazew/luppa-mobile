import { FormProvider, useForm } from 'react-hook-form'

export interface RegisterCompanyFormValues {}

export function RegisterCompanyFormProvider({ children }: { children: React.ReactNode }) {
  const methods = useForm<RegisterCompanyFormValues>({
    defaultValues: {},
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import {
  registerBusinessStatusSchema,
  type RegisterBusinessStatusInfer,
} from 'schemas/register-business'

export function StatusContextFormProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const methods = useForm<RegisterBusinessStatusInfer>({
    resolver: zodResolver(registerBusinessStatusSchema),
    defaultValues: {
      status: {
        diamond: {
          minimumPoints: '',
          description: '',
          pointsDecrement: '',
        },
        gold: {
          minimumPoints: '',
          description: '',
          pointsDecrement: '',
        },
        silver: {
          minimumPoints: '',
          description: '',
          pointsDecrement: '',
        },
      },
    },
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}

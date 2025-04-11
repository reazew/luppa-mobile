import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { createClient } from 'components/auth/cadastrar/cliente/actions'
import { Button } from 'components/global/button'
import { FormItem } from 'components/global/form-item'
import { Form, FormField } from 'components/ui/form'
import { router } from 'expo-router'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react-native'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { TextInput, View } from 'react-native'
import {
  registerClientSchema,
  type RegisterClientInfer,
} from 'schemas/register-client'
import { useStepStore } from 'store/useStepStore'
import { useUserStore } from 'store/useUserStore'

export const RegisterClientForm = (params: { email: string; role: string }) => {
  const { setStep } = useStepStore()
  const { setUser } = useUserStore()

  const form = useForm<RegisterClientInfer>({
    resolver: zodResolver(registerClientSchema),
    defaultValues: {
      name: '',
      cpf: '',
      email: params?.email || '',
      phone: '',
      birthDate: '',
      imageFile: undefined,
      imageUrl: '',
      role: params?.role || '',
    },
  })

  useEffect(() => {
    const imageFile = form.watch('imageFile')?.[0]
    if (imageFile?.uri) {
      form.setValue('imageUrl', imageFile.uri)
    }
  }, [form])

  const handleBack = () => {
    router.back()
  }

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['create-client'],
    mutationFn: createClient,
    onSuccess: (response) => {
      setUser({
        token: response.token,
        userId: response.userId,
        isRegistrationComplete: false,
        lastCompletedStep: 1,
        role: response.role,
      })
      router.push('/form-step-payment-methods')
      setStep(1)
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const onSubmit = (data: RegisterClientInfer) => {
    console.log('Dados do cadastro/cliente:', data)
    mutateAsync(data)
  }

  const cpfRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const phoneRef = useRef<TextInput>(null)

  return (
    <Form {...form}>
      <View className="w-full flex-1 justify-start">
        <FormField
          control={form.control}
          name="imageFile"
          render={({ field }) => (
            <FormItem
              field={field}
              fieldType="image-picker"
              label="Foto de perfil"
              imagePreviewSize={{ width: 128, height: 128 }}
            />
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem
              field={field}
              fieldType="input"
              label="Nome"
              formContext={form}
              placeholder="Digite seu nome"
              onSubmitEditing={() => cpfRef.current?.focus()}
            />
          )}
        />
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem
              field={field}
              fieldType="masked-input"
              label="CPF"
              placeholder="Digite seu CPF"
              mask="999.999.999-99"
              keyboardType="phone-pad"
              ref={cpfRef}
              onSubmitEditing={() => emailRef.current?.focus()}
              formContext={form}
            />
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem
              field={field}
              fieldType="input"
              formContext={form}
              label="E-mail"
              placeholder="email@email.com"
              keyboardType="email-address"
              ref={emailRef}
              onSubmitEditing={() => phoneRef.current?.focus()}
            />
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem
              field={field}
              fieldType="masked-input"
              label="Telefone"
              formContext={form}
              placeholder="Digite seu telefone"
              mask="(99) 99999-9999"
              keyboardType="phone-pad"
              ref={phoneRef}
            />
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem
              field={field}
              fieldType="birth-date"
              label="Aniversário"
              placeholder="Dia/Mês"
            />
          )}
        />
      </View>
      <View className="flex w-full flex-row items-center justify-between gap-2">
        <Button
          variant="ghost"
          size="icon"
          onPress={handleBack}
          className="w-1/2 max-w-[189px]">
          <Button.Icon>
            <CircleArrowLeft size={16} />
          </Button.Icon>
          <Button.Text>Voltar</Button.Text>
        </Button>
        <Button
          onPress={form.handleSubmit(onSubmit)}
          className="w-1/2 max-w-[189px]"
          disabled={isPending}>
          <Button.Text>{isPending ? 'Enviando...' : 'Avançar'}</Button.Text>
          <Button.Icon>
            <CircleArrowRight size={16} />
          </Button.Icon>
        </Button>
      </View>
    </Form>
  )
}

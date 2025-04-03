import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/global/button'
import { FormItem } from 'components/global/form-item'
import { Form, FormField } from 'components/ui/form'
import type { ImagePickerAsset } from 'expo-image-picker'
import { router } from 'expo-router'
import { CircleArrowRight, MoveLeft } from 'lucide-react-native'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextInput, View } from 'react-native'
import {
  registerClientSchema,
  type RegisterClientInfer,
} from 'schemas/register-client'
import { useStepStore } from 'store/useStepStore'
import type { User } from 'types/user'

export const RegisterClientForm = (clientUserData: User) => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RegisterClientInfer>({
    resolver: zodResolver(registerClientSchema),
    defaultValues: {
      name: clientUserData.name,
      email: clientUserData.email,
      phone: clientUserData.phone,
      birthDate: clientUserData.birthDate,
      imageFile: clientUserData.imageUrl
        ? [
            {
              uri: clientUserData.imageUrl,
            } as ImagePickerAsset,
          ]
        : null,
      imageUrl: clientUserData.imageUrl,
    },
  })

  const { nextStep } = useStepStore()

  const handleBack = () => {
    router.back()
  }

  const onSubmit = form.handleSubmit(async (value) => {
    if (isLoading) return

    setIsLoading(true)
    try {
      console.log(value)
      router.push('/form-step-payment-methods')
      nextStep()
    } finally {
      setIsLoading(false)
    }
  })

  const emailRef = useRef<TextInput>(null)
  const phoneRef = useRef<TextInput>(null)

  return (
    <Form {...form}>
      <View className="w-full flex-1 justify-start ">
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
              onSubmitEditing={() => emailRef.current?.focus()}
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
        <Button variant="ghost" size="icon" onPress={handleBack}>
          <Button.Icon>
            <MoveLeft size={16} />
          </Button.Icon>
        </Button>
        <Button
          onPress={onSubmit}
          className="max-w-[200px]"
          disabled={isLoading}>
          <Button.Text>{isLoading ? 'Processando...' : 'Avançar'}</Button.Text>
          <Button.Icon>
            <CircleArrowRight size={16} />
          </Button.Icon>
        </Button>
      </View>
    </Form>
  )
}

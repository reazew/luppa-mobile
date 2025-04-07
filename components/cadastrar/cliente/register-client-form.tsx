import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/global/button'
import { FormItem } from 'components/global/form-item'
import { Form, FormField } from 'components/ui/form'
import type { ImagePickerAsset } from 'expo-image-picker'
import { router } from 'expo-router'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react-native'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { TextInput, View } from 'react-native'
import {
  registerClientSchema,
  type RegisterClientInfer,
} from 'schemas/register-client'
import { useFormStore } from 'store/useFormStore'
import { useStepStore } from 'store/useStepStore'

const FORM_ID = 'register-client-form'

export const RegisterClientForm = () => {
  const { getForm, updateForm } = useFormStore()
  const { setStep } = useStepStore()

  const savedData = getForm(FORM_ID) || {}

  const form = useForm<RegisterClientInfer>({
    resolver: zodResolver(registerClientSchema),
    defaultValues: {
      name: savedData.name || '',
      cpf: savedData.cpf || '',
      email: savedData.email || '',
      phone: savedData.phone || '',
      birthDate: savedData.birthDate || '',
      imageFile: savedData.imageUrl
        ? [{ uri: savedData.imageUrl } as ImagePickerAsset]
        : undefined,
      imageUrl: savedData.imageUrl || '',
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

  const handleSubmit = form.handleSubmit((formData) => {
    const imageUrl = formData.imageFile?.[0]?.uri || formData.imageUrl

    updateForm(FORM_ID, {
      ...formData,
      imageUrl,
      imageFile: undefined,
    })

    router.push('/form-step-payment-methods')
    setStep(1)
  })

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
          onPress={handleSubmit}
          className="w-1/2 max-w-[189px]"
          disabled={form.formState.isSubmitting}>
          <Button.Text>
            {form.formState.isSubmitting ? 'Enviando...' : 'Avançar'}
          </Button.Text>
          <Button.Icon>
            <CircleArrowRight size={16} />
          </Button.Icon>
        </Button>
      </View>
    </Form>
  )
}

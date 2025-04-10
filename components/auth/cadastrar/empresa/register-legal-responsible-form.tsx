import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/global/button'
import { FormItem } from 'components/global/form-item'
import { Form, FormField } from 'components/ui/form'
import { router } from 'expo-router'
import {
  CircleArrowLeft,
  CircleArrowRight,
  FileIcon,
} from 'lucide-react-native'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { TextInput, View } from 'react-native'
import {
  registerLegalResponsibleSchema,
  type RegisterLegalResponsibleInfer,
} from 'schemas/register-business'
import { useFormStore } from 'store/useFormStore'
import { useStepStore } from 'store/useStepStore'

const FORM_ID = 'register-legal-responsible-form'

export const RegisterLegalResponsibleForm = () => {
  const { getForm, updateForm } = useFormStore()
  const { setStep } = useStepStore()

  const savedData = getForm(FORM_ID) || {}

  const form = useForm<RegisterLegalResponsibleInfer>({
    resolver: zodResolver(registerLegalResponsibleSchema),
    defaultValues: {
      name: savedData.name || '',
      cpf: savedData.cpf || '',
      email: savedData.email || '',
      phone: savedData.phone || '',
      file: savedData.file,
    },
  })

  const handleBack = () => {
    router.back()
  }

  const handleSubmit = form.handleSubmit((formData) => {
    updateForm(FORM_ID, {
      ...formData,
      file: formData.file,
    })

    router.navigate('/form-step-about-business')
    setStep(1)
  })

  const emailRef = useRef<TextInput>(null)
  const phoneRef = useRef<TextInput>(null)
  const cpfRef = useRef<TextInput>(null)

  return (
    <Form {...form}>
      <View className="w-full flex-1 justify-start">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem
              field={field}
              fieldType="input"
              label="Nome completo"
              placeholder="Digite seu nome"
              onSubmitEditing={() => cpfRef.current?.focus()}
              formContext={form}
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
              label="E-mail"
              placeholder="Digite seu email"
              keyboardType="email-address"
              ref={emailRef}
              onSubmitEditing={() => phoneRef.current?.focus()}
              formContext={form}
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
              placeholder="Digite seu telefone"
              mask="(99) 99999-9999"
              keyboardType="phone-pad"
              ref={phoneRef}
              formContext={form}
            />
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem
              field={field}
              fieldType="document-picker"
              label="Foto do Documento de Identificação"
              placeholder="Selecione o documento"
              icon={FileIcon}
              documentPickerOptions={{
                type: ['application/pdf'],
                multiple: false,
              }}
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
        <Button onPress={handleSubmit} className="w-1/2 max-w-[189px]">
          <Button.Text>Avançar</Button.Text>
          <Button.Icon>
            <CircleArrowRight size={16} />
          </Button.Icon>
        </Button>
      </View>
    </Form>
  )
}

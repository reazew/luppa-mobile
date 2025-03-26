import { Button } from 'components/global/button'
import { Container } from 'components/global/container'
import { FormItem } from 'components/global/form-item'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import { Form, FormField } from 'components/ui/form'
import type { RegisterClientFormProps } from 'context/register-client-context'
import { ArrowRight, MoveLeft } from 'lucide-react-native'
import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { TextInput, View } from 'react-native'

export default function FormStepBasicInformation() {
  const form = useFormContext<RegisterClientFormProps>()

  const emailRef = useRef<TextInput>(null)
  const phoneRef = useRef<TextInput>(null)
  const birthDateRef = useRef<TextInput>(null)

  return (
    <KeyboardView>
      <ScrollView>
        <Container className="items-center justify-between gap-[32px] px-6">
          <Text size="huge-2" weight="bold" className="w-full text-left">
            Nos conte sobre você
          </Text>
          <Form {...form}>
            <View className="w-full flex-1 justify-start ">
              <FormField
                control={form.control}
                name="imageFile"
                render={({ field }) => (
                  <FormItem field={field} fieldType="image-picker" imagePreviewSize={{ width: 128, height: 128 }} />
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
                    label="E-mail"
                    placeholder="Digite seu email"
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
                    placeholder="Digite seu telefone"
                    mask="(99) 99999-9999"
                    keyboardType="phone-pad"
                    ref={phoneRef}
                    onSubmitEditing={() => birthDateRef.current?.focus()}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem field={field} fieldType="birth-date" label="Aniversário" placeholder="Dia/Mês" />
                )}
              />
            </View>
          </Form>
          <View className="flex w-full flex-row items-center justify-between gap-2">
            <Button
              variant="ghost"
              size="icon"
              onPress={() => {
                /* Handle back navigation */
              }}>
              <Button.Icon>
                <MoveLeft size={16} />
              </Button.Icon>
            </Button>
            <Button
              onPress={() => {
                /* Handle next step */
              }}
              className="max-w-[200px]">
              <Button.Text>Avançar</Button.Text>
              <Button.Icon>
                <ArrowRight size={16} />
              </Button.Icon>
            </Button>
          </View>
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

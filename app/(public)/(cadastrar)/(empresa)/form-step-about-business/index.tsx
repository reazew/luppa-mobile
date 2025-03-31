import { zodResolver } from '@hookform/resolvers/zod'
import { Shop2Icon } from 'assets/icons'
import { Button } from 'components/global/button'
import { Container } from 'components/global/container'
import { FormItem } from 'components/global/form-item'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import { Form, FormField } from 'components/ui/form'
import { router } from 'expo-router'
import { ArrowRight, MoveLeft } from 'lucide-react-native'
import { getCityOptions, getStateOptions } from 'mock/cities'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { TextInput, View } from 'react-native'
import { registerCompanySchema, type RegisterCompanyInfer } from 'schemas/register'
import { useStepStore } from 'store/useStepStore'

export default function RegisterCompanyForm() {
  const { nextStep } = useStepStore()

  const handleBack = () => {
    router.back()
  }

  const handleNext = () => {
    nextStep()
  }

  const form = useForm<RegisterCompanyInfer>({
    resolver: zodResolver(registerCompanySchema),
    defaultValues: {
      nameCompany: '',
      cnpj: '',
      email: '',
      phone: '',
      address: '',
      cep: '',
      segment: 'Pizzaria',
      city: '',
      uf: '',
      imageFile: null,
    },
  })

  const emailRef = useRef<TextInput>(null)
  const phoneRef = useRef<TextInput>(null)
  const birthDateRef = useRef<TextInput>(null)

  return (
    <KeyboardView>
      <ScrollView>
        <Container hasHeader className="items-center justify-between px-6">
          <Text size="huge-2" weight="bold" className="w-full pb-[32px] text-left">
            Informações sobre o seu negócio
          </Text>
          <Form {...form}>
            <View className="w-full flex-1 justify-start ">
              <FormField
                control={form.control}
                name="imageFile"
                render={({ field }) => (
                  <FormItem
                    field={field}
                    fieldType="image-picker"
                    placeholderIcon={<Shop2Icon />}
                    imagePreviewSize={{ width: 128, height: 128 }}
                    label="Logo do seu Negócio"
                  />
                )}
              />
              <FormField
                control={form.control}
                name="nameCompany"
                render={({ field }) => (
                  <FormItem
                    field={field}
                    fieldType="input"
                    label="Nome Fantasia"
                    placeholder="Nome do seu negócio"
                    onSubmitEditing={() => emailRef.current?.focus()}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem
                    field={field}
                    fieldType="masked-input"
                    label="CNPJ"
                    placeholder="Digite o CNPJ"
                    mask="99.999.999/9999-99"
                    keyboardType="phone-pad"
                    ref={phoneRef}
                    onSubmitEditing={() => birthDateRef.current?.focus()}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="segment"
                render={({ field }) => (
                  <FormItem
                    field={field}
                    fieldType="select"
                    label="Segmento"
                    placeholder="Selecione o segmento"
                    options={[{ label: 'Pizzaria', value: 'Pizzaria' }]}
                    ref={emailRef}
                    onSubmitEditing={() => phoneRef.current?.focus()}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="address"
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
                name="city"
                control={form.control}
                render={({ field }) => (
                  <FormItem
                    field={field}
                    fieldType="select"
                    label="Cidade"
                    placeholder="Selecione"
                    options={getCityOptions()}
                    className="w-full"
                  />
                )}
              />
              <FormField
                name="uf"
                control={form.control}
                render={({ field }) => (
                  <FormItem
                    field={field}
                    fieldType="select"
                    label="Estado"
                    placeholder="Selecione"
                    options={getStateOptions()}
                    className="w-full"
                  />
                )}
              />
              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem
                    field={field}
                    fieldType="masked-input"
                    label="CEP"
                    placeholder="Digite o CEP"
                    mask="99.999-999"
                    keyboardType="phone-pad"
                    ref={phoneRef}
                    onSubmitEditing={() => birthDateRef.current?.focus()}
                  />
                )}
              />
            </View>
          </Form>
          <View className="flex w-full flex-row items-center justify-between gap-2">
            <Button variant="ghost" size="icon" onPress={handleBack}>
              <Button.Icon>
                <MoveLeft size={16} />
              </Button.Icon>
            </Button>
            <Button onPress={handleNext} className="max-w-[200px]">
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

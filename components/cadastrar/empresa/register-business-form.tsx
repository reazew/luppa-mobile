import { zodResolver } from '@hookform/resolvers/zod'
import { Shop2Icon } from 'assets/icons'
import { Button } from 'components/global/button'
import { FormItem } from 'components/global/form-item'
import { Form, FormField } from 'components/ui/form'
import type { ImagePickerAsset } from 'expo-image-picker'
import { router } from 'expo-router'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react-native'
import { getCityOptions, getStateOptions } from 'mock/cities'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { View, type TextInput } from 'react-native'
import {
  registerBusinessSchema,
  type RegisterBusinessInfer,
} from 'schemas/register-business'
import { useStepStore } from 'store/useStepStore'
import type { User } from 'types/user'

interface SelectFieldRef {
  setIsOpen: (open: boolean) => void
}

export const RegisterBusinessForm = (businessData: User) => {
  const form = useForm<RegisterBusinessInfer>({
    resolver: zodResolver(registerBusinessSchema),
    defaultValues: {
      imageFile: businessData.imageUrl
        ? [
            {
              uri: businessData.imageUrl,
            } as ImagePickerAsset,
          ]
        : [],
      imageUrl: businessData.imageUrl,
      nameBusiness: businessData.name,
      cnpj: businessData.cnpj,
      segment: businessData.segment,
      address: businessData.address,
      state: businessData.state,
      city: businessData.city,
      cep: businessData.cep,
    },
  })

  const { setStep } = useStepStore()
  const [loading, setLoading] = useState(false)

  const handleBack = () => {
    router.back()
  }

  const onSubmit = form.handleSubmit(async (value) => {
    if (loading) return

    setLoading(true)
    try {
      console.log(value)
      router.navigate('/form-step-gallery')
      setStep(2)
    } catch (error) {
      console.error(error)
    }
  })

  const cnpjRef = useRef<TextInput>(null)
  const addressRef = useRef<TextInput>(null)
  const cepRef = useRef<TextInput>(null)

  const segmentSelectRef = useRef<SelectFieldRef>(null)
  const ufSelectRef = useRef<SelectFieldRef>(null)
  const citySelectRef = useRef<SelectFieldRef>(null)

  const selectedUf = form.watch('state')
  const [cities, setCities] = useState<{ label: string; value: string }[]>([])
  const [isLoadingCities, setIsLoadingCities] = useState(false)

  const handleUfChange = async (uf: string) => {
    setIsLoadingCities(true)
    setCities([])

    await new Promise((resolve) => setTimeout(resolve, 100))
    const cityOptions = getCityOptions(uf)

    setCities(cityOptions || [])
    setIsLoadingCities(false)
  }

  useEffect(() => {
    if (selectedUf) {
      handleUfChange(selectedUf)
    }
  }, [selectedUf])

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
              placeholderIcon={<Shop2Icon />}
              imagePreviewSize={{ width: 128, height: 128 }}
              label="Logo do seu Negócio"
              showTakePhotoButton={false}
            />
          )}
        />
        <FormField
          control={form.control}
          name="nameBusiness"
          render={({ field }) => (
            <FormItem
              field={field}
              fieldType="input"
              label="Nome Fantasia"
              placeholder="Nome do seu negócio"
              onSubmitEditing={() => cnpjRef.current?.focus()}
              formContext={form}
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
              ref={cnpjRef}
              onSubmitEditing={() => segmentSelectRef.current?.setIsOpen(true)}
              formContext={form}
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
              options={[
                { label: 'Pizzaria', value: 'Pizzaria' },
                { label: 'Hamburgueria', value: 'Hamburgueria' },
                { label: 'Sorveteria', value: 'Sorveteria' },
                { label: 'Padaria', value: 'Padaria' },
                { label: 'Outros', value: 'Outros' },
              ]}
              ref={segmentSelectRef as any}
              onValueSelect={() => addressRef.current?.focus()}
            />
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem
              field={field}
              fieldType="input"
              label="Endereço"
              placeholder="Rua, número, complemento"
              ref={addressRef}
            />
          )}
        />
        <FormField
          name="state"
          control={form.control}
          render={({ field }) => (
            <FormItem
              field={field}
              fieldType="select"
              label="Estado"
              placeholder="Selecione"
              options={getStateOptions()}
              className="w-full"
              ref={ufSelectRef as any}
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
              placeholder={
                !selectedUf
                  ? 'Selecione primeiro o estado'
                  : 'Selecione a cidade'
              }
              options={cities}
              className="w-full"
              ref={citySelectRef as any}
              onValueSelect={() => cepRef.current?.focus()}
              disabled={!selectedUf || isLoadingCities}
              loading={isLoadingCities}
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
              ref={cepRef}
              formContext={form}
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
          onPress={onSubmit}
          className="w-1/2 max-w-[189px]"
          disabled={loading}>
          <Button.Text>{loading ? 'Enviando...' : 'Avançar'}</Button.Text>
          <Button.Icon>
            <CircleArrowRight size={16} />
          </Button.Icon>
        </Button>
      </View>
    </Form>
  )
}

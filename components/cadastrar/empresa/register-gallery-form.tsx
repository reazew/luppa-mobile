import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/global/button'
import { FormItem } from 'components/global/form-item'
import { Form, FormField } from 'components/ui/form'
import { router } from 'expo-router'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react-native'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import {
  registerBusinessGallerySchema,
  type RegisterBusinessGalleryInfer,
} from 'schemas/register-business'
import { useStepStore } from 'store/useStepStore'
import type { User } from 'types/user'

export const RegisterGalleryForm = (businessUserData: User) => {
  const form = useForm<RegisterBusinessGalleryInfer>({
    resolver: zodResolver(registerBusinessGallerySchema),
    defaultValues: {
      description: businessUserData.description,
      galleryImagesFiles: [],
      galleryImagesUrls: businessUserData.galleryImagesUrls,
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
      router.navigate('/form-step-bonus-status')
      setStep(3)
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <Form {...form}>
      <View className="w-full flex-1 justify-start ">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem
              field={field}
              fieldType="textarea"
              label="Descrição do seu Negócio"
              placeholder="Fale sobre o que seu negócio oferece"
              formContext={form}
            />
          )}
        />
        <FormField
          control={form.control}
          name="galleryImagesFiles"
          render={({ field }) => (
            <FormItem
              field={field}
              fieldType="image-gallery-picker"
              label="Galeria de imagens"
              imagePreviewSize={{ width: 90, height: 90 }}
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

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/global/button'
import { FormItem } from 'components/global/form-item'
import { Form, FormField } from 'components/ui/form'
import type { ImagePickerAsset } from 'expo-image-picker'
import { router } from 'expo-router'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react-native'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import {
  registerBusinessGallerySchema,
  type RegisterBusinessGalleryInfer,
} from 'schemas/register-business'
import { useFormStore } from 'store/useFormStore'
import { useStepStore } from 'store/useStepStore'

const FORM_ID = 'register-gallery-form'

export const RegisterGalleryForm = () => {
  const { getForm, updateForm } = useFormStore()
  const { setStep } = useStepStore()

  const savedData = getForm(FORM_ID) || {}

  const form = useForm<RegisterBusinessGalleryInfer>({
    resolver: zodResolver(registerBusinessGallerySchema),
    defaultValues: {
      description: savedData.description || '',
      galleryImagesFiles: savedData.galleryImagesUrls
        ? savedData.galleryImagesUrls.map(
            (uri: string) => ({ uri }) as ImagePickerAsset
          )
        : [],
      galleryImagesUrls: savedData.galleryImagesUrls || [],
    },
  })

  useEffect(() => {
    const imagesFiles = form.watch('galleryImagesFiles')
    if (imagesFiles?.length > 0) {
      const urls = imagesFiles.map((file) => file.uri)
      form.setValue('galleryImagesUrls', urls)
    }
  }, [form])

  const handleBack = () => {
    router.back()
  }

  const handleSubmit = form.handleSubmit((formData) => {
    const galleryImagesUrls =
      formData.galleryImagesFiles?.map((file) => file.uri) || []

    updateForm(FORM_ID, {
      ...formData,
      galleryImagesUrls,
      galleryImagesFiles: undefined,
    })

    router.navigate('/form-step-bonus-status')
    setStep(3)
  })

  return (
    <Form {...form}>
      <View className="w-full flex-1 justify-start">
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

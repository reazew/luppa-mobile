import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/global/button'
import { FormItem } from 'components/global/form-item'
import { Form, FormField } from 'components/ui/form'
import { router } from 'expo-router'
import { CircleArrowRight, MoveLeft } from 'lucide-react-native'
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

  const { nextStep } = useStepStore()
  const handleBack = () => {
    router.back()
  }

  const onSubmit = form.handleSubmit((value) => {
    console.log(value)
    router.push('/form-step-bonus-status')
    nextStep()
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
        <Button variant="ghost" size="icon" onPress={handleBack}>
          <Button.Icon>
            <MoveLeft size={16} />
          </Button.Icon>
        </Button>
        <Button onPress={onSubmit} className="max-w-[200px]">
          <Button.Text>Avançar</Button.Text>
          <Button.Icon>
            <CircleArrowRight size={16} />
          </Button.Icon>
        </Button>
      </View>
    </Form>
  )
}

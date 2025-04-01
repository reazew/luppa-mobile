import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/global/button'
import { Container } from 'components/global/container'
import { FormItem } from 'components/global/form-item'
import { Heading } from 'components/global/heading'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Form, FormField } from 'components/ui/form'
import { router } from 'expo-router'
import { CircleArrowRight, MoveLeft } from 'lucide-react-native'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import {
  registerBusinessGallerySchema,
  type RegisterBusinessGalleryInfer,
} from 'schemas/register'
import { useStepStore } from 'store/useStepStore'

export default function FormStepGallery() {
  const { nextStep } = useStepStore()
  const handleBack = () => {
    router.back()
  }

  const handleNext = () => {
    router.push('/form-step-bonus-status')
    nextStep()
  }

  const form = useForm<RegisterBusinessGalleryInfer>({
    resolver: zodResolver(registerBusinessGallerySchema),
    defaultValues: {
      description: '',
      // galleryImagesFiles: transformUrlsInFiles(
      //   business?.galleryImagesUrls || []
      // ),
      galleryImagesUrls: [],
    },
  })

  return (
    <KeyboardView>
      <ScrollView>
        <Container
          hasHeader
          className="items-center justify-between gap-8 px-6">
          <Heading>Alguns toques finais</Heading>
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
                <CircleArrowRight size={16} />
              </Button.Icon>
            </Button>
          </View>
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

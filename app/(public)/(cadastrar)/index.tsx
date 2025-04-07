import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/global/button'
import { Container } from 'components/global/container'
import { FormItem } from 'components/global/form-item'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import { Form, FormField } from 'components/ui/form'
import { router } from 'expo-router'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react-native'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import type { clientOrBusinessInfer } from 'schemas/register-client'
import { clientOrBusinessSchema } from 'schemas/register-client'
import { useFormStore } from 'store/useFormStore'
import { useStepStore } from 'store/useStepStore'

const FORM_ID = 'register-type-form'

export default function RegisterIndexScreen() {
  const { getForm, updateForm } = useFormStore()
  const { setStep } = useStepStore()

  const savedData = getForm(FORM_ID) || {}

  const form = useForm<clientOrBusinessInfer>({
    resolver: zodResolver(clientOrBusinessSchema),
    defaultValues: {
      type: savedData.type || '',
    },
  })

  const handleBack = () => {
    router.back()
  }

  const handleSubmit = form.handleSubmit((formData) => {
    const result = clientOrBusinessSchema.safeParse(formData)
    if (!result.success) {
      return form.setError('type', {
        type: 'required',
        message: 'Por favor, selecione um tipo de cadastro',
      })
    }

    updateForm(FORM_ID, {
      ...formData,
    })

    if (result.data.type === 'client') {
      router.navigate('/(public)/(cadastrar)/(cliente)')
    } else {
      router.navigate('/(public)/(cadastrar)/(empresa)')
    }
    setStep(0)
  })

  return (
    <KeyboardView>
      <ScrollView>
        <Container className="items-center justify-between px-6">
          <Text
            size="huge-2"
            weight="bold"
            className="w-full pb-[32px] text-left">
            Nos conte sobre você
          </Text>
          <Form {...form}>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem
                  field={field}
                  fieldType="toggle-group"
                  toggleOptions={[
                    {
                      label: 'Sou cliente',
                      value: 'client',
                      icon: 'client',
                      description:
                        'Quero ter acesso a uma rede de serviços e benefícios exclusivos.',
                    },
                    {
                      label: 'Tenho um Negócio',
                      value: 'business',
                      icon: 'business',
                      description:
                        'Quero uma plataforma segura e confiável para facilitar e impulsionar negócios',
                    },
                  ]}
                />
              )}
            />
            <View className="w-full flex-row items-center justify-between gap-2">
              <Button
                variant="ghost"
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
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

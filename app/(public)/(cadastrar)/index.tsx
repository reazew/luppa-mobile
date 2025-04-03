import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/global/button'
import { Container } from 'components/global/container'
import { FormItem } from 'components/global/form-item'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import { Form, FormField } from 'components/ui/form'
import { router } from 'expo-router'
import { CircleArrowRight } from 'lucide-react-native'
import { useForm } from 'react-hook-form'
import type { clientOrBusinessInfer } from 'schemas/register-client'
import { clientOrBusinessSchema } from 'schemas/register-client'
import { useStepStore } from 'store/useStepStore'

export default function RegisterIndexScreen() {
  const { nextStep } = useStepStore()

  const form = useForm<clientOrBusinessInfer>({
    resolver: zodResolver(clientOrBusinessSchema),
  })

  function handleNextStep(data: clientOrBusinessInfer) {
    const result = clientOrBusinessSchema.safeParse(data)

    if (!result.success) {
      return form.setError('type', {
        type: 'required',
        message: 'Por favor, selecione um tipo de cadastro',
      })
    }

    nextStep()
    if (result.data.type === 'client') {
      router.navigate('/(public)/(cadastrar)/(cliente)')
    } else {
      router.navigate(
        '/(public)/(cadastrar)/(empresa)/form-step-about-business'
      )
    }
  }

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
          </Form>
          <Button
            onPress={() => {
              handleNextStep(form.getValues())
            }}
            className="mx-auto max-w-[200px]">
            <Button.Text>Avançar</Button.Text>
            <Button.Icon>
              <CircleArrowRight size={16} />
            </Button.Icon>
          </Button>
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

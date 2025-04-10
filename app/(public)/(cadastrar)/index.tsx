import { zodResolver } from '@hookform/resolvers/zod'
import { RegistrationProgress } from 'components/auth/cadastrar/registration-progress'
import { Button } from 'components/global/button'
import { Container } from 'components/global/container'
import { FormItem } from 'components/global/form-item'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import { Form, FormField } from 'components/ui/form'
import { router, useLocalSearchParams } from 'expo-router'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react-native'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import type { roleInfer } from 'schemas/register-client'
import { roleSchema } from 'schemas/register-client'
import { useFormStore } from 'store/useFormStore'
import { useStepStore } from 'store/useStepStore'

const FORM_ID = 'register-type-form'

export default function RegisterIndexScreen() {
  const params = useLocalSearchParams()
  const { getForm, updateForm } = useFormStore()
  const { setStep } = useStepStore()

  const savedData = getForm(FORM_ID) || {}

  const form = useForm<roleInfer>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      role: savedData.role || '',
    },
  })

  const handleBack = () => {
    router.back()
  }

  const onSubmit = (data: roleInfer) => {
    if (!data.role) {
      return form.setError('role', {
        type: 'required',
        message: 'Por favor, selecione um tipo de cadastro',
      })
    }

    updateForm(FORM_ID, data)

    if (data.role === 'client') {
      router.navigate({
        pathname: '/(public)/(cadastrar)/(cliente)',
        params: { email: params.email, role: data.role },
      })
    } else {
      router.navigate({
        pathname: '/(public)/(cadastrar)/(empresa)',
        params: { email: params.email },
      })
    }
    setStep(0)
  }

  return (
    <KeyboardView>
      <RegistrationProgress />
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
              name="role"
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
              <Button
                onPress={form.handleSubmit(onSubmit)}
                className="w-1/2 max-w-[189px]">
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

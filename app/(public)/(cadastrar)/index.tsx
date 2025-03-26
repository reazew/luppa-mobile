import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/global/button'
import { Container } from 'components/global/container'
import { FormItem } from 'components/global/form-item'
import { Text } from 'components/global/text'
import { Form, FormField } from 'components/ui/form'
import { router } from 'expo-router'
import { CircleArrowRight } from 'lucide-react-native'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import type { clientOrCompanyInfer } from 'schemas/register'
import { clientOrCompanySchema } from 'schemas/register'

export default function RegisterIndexScreen() {
  const form = useForm<clientOrCompanyInfer>({
    resolver: zodResolver(clientOrCompanySchema),
  })

  function handleNextStep(data: clientOrCompanyInfer) {
    const result = clientOrCompanySchema.safeParse(data)

    if (!result.success) {
      return form.setError('type', {
        type: 'required',
        message: 'Por favor, selecione um tipo de cadastro',
      })
    }

    const routes = {
      client: '/(public)/(cadastrar)/(cliente)/form-step-basic-information',
      company: '/(public)/(cadastrar)/(empresa)/form-step-about-legal-guardian',
    } as const

    router.push(routes[result.data.type])
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView
        className="bg-background"
        alwaysBounceVertical={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{
          flex: 1,
        }}>
        <Container className="items-center justify-between gap-[32px] px-6">
          <Text size="huge-2" weight="bold" className="w-full text-left">
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
                      description: 'Quero ter acesso a uma rede de serviços e benefícios exclusivos.',
                    },
                    {
                      label: 'Tenho um Negócio',
                      value: 'company',
                      icon: 'company',
                      description: 'Quero uma plataforma segura e confiável para facilitar e impulsionar negócios',
                    },
                  ]}
                />
              )}
            />
          </Form>
          <Button onPress={() => handleNextStep(form.getValues())} className="mx-auto max-w-[200px]">
            <Button.Text>Avançar</Button.Text>
            <Button.Icon>
              <CircleArrowRight size={16} />
            </Button.Icon>
          </Button>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

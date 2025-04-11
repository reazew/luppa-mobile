import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Logo } from 'assets/icons'
import { sendVerificationCode } from 'components/auth/login/actions'
import { Button } from 'components/global/button'
import { Container } from 'components/global/container'
import { FormItem } from 'components/global/form-item'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import { Form, FormField } from 'components/ui/form'
import { useRouter } from 'expo-router'
import { CircleArrowRight } from 'lucide-react-native'
import { useForm } from 'react-hook-form'
import { Alert, View } from 'react-native'
import { sendCodeSchema, type SendCodeSchemaInfer } from 'schemas/login'

export default function LoginScreen() {
  const router = useRouter()

  const form = useForm<SendCodeSchemaInfer>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(sendCodeSchema),
  })

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['send-verification-code'],
    mutationFn: sendVerificationCode,
    onSuccess: (data) => {
      const email = form.getValues('email').toLowerCase().trim()
      router.navigate({
        pathname: '/(public)/(login)/confirm-login',
        params: { email },
      })
    },
    onError: (error: any) => {
      console.log({ error })
      if (error.status === 400) {
        Alert.alert(
          'Bem vindo!',
          'E-mail não cadastrado, por favor cadastre-se',
          [
            { text: 'Cancelar' },
            {
              text: 'Cadastrar',
              onPress: () => {
                router.navigate({
                  pathname: '/(public)/(cadastrar)',
                  params: {
                    email: form.getValues('email').toLowerCase().trim(),
                  },
                })
              },
            },
          ]
        )
      } else {
        Alert.alert(
          'Atenção',
          error?.response?.data?.message ||
            'Erro ao realizar login, verifique o e-mail e sua conexão com a internet'
        )
      }
    },
  })

  const onSubmit = (data: SendCodeSchemaInfer) =>
    mutateAsync({ email: data.email.toLowerCase().trim() })

  return (
    <KeyboardView>
      <ScrollView>
        <Container className="px-8">
          <View className="flex-1 items-center justify-center pt-10 ">
            <View className="max-w-[364px] flex-1 items-center justify-center gap-8 ">
              <Logo width={160} height={200} />
              <Text size="huge-3" weight="bold" className="text-center">
                Continue com seu e-mail
              </Text>
              <Text
                size="md"
                weight="regular"
                className="mt-2 text-center text-white">
                Digite seu e-mail para continuar
              </Text>
            </View>
            <View className="w-full">
              <Form {...form}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem
                      fieldType="input"
                      field={field}
                      label="E-mail"
                      placeholder="seuemail@email.com"
                      formContext={form}
                    />
                  )}
                />
              </Form>
            </View>
            <Button isLoading={isPending} onPress={form.handleSubmit(onSubmit)}>
              <Button.Icon>
                <CircleArrowRight size={16} />
              </Button.Icon>
              <Button.Text>Avançar</Button.Text>
            </Button>
          </View>
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

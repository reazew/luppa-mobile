import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { validateCodeLogin } from 'components/auth/login/actions'
import { Button } from 'components/global/button'
import { Container } from 'components/global/container'
import { FormItem } from 'components/global/form-item'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import { Form, FormField } from 'components/ui/form'
import { router, useLocalSearchParams } from 'expo-router'
import { useForm } from 'react-hook-form'
import { Alert, View } from 'react-native'
import { validateCodeSchema, type ValidateCodeSchemaInfer } from 'schemas/login'
import { useUserStore } from 'store/useUserStore'

export default function ConfirmLoginScreen() {
  const { setUser } = useUserStore()

  const params = useLocalSearchParams()

  const form = useForm<ValidateCodeSchemaInfer>({
    defaultValues: {
      code: '',
    },
    resolver: zodResolver(validateCodeSchema),
  })

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['validate-code'],
    mutationFn: (data: ValidateCodeSchemaInfer) =>
      validateCodeLogin(params.email as string, data),
    onSuccess: (data) => {
      setUser({
        token: data.token,
        role: data.role,
        userId: data.user.id,
      })

      if (data.role === 'client') {
        router.navigate({
          pathname: '/(private)/(cliente)/inicio',
        })
      } else {
        router.navigate({
          pathname: '/(private)/(empresa)/inicio',
        })
      }
    },
    onError: (error: any) => {
      console.log({ error })
      Alert.alert(
        'Atenção',
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          'Erro ao realizar login, verifique o e-mail e sua conexão com a internet'
      )
      form.reset({ code: '' })
    },
  })

  const onSubmit = async (data: ValidateCodeSchemaInfer) => {
    try {
      await mutateAsync({ code: data.code })
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <KeyboardView>
      <ScrollView>
        <Container className="px-8">
          <View className="flex-1 items-center justify-center pt-10 ">
            <Text>Confirmar login</Text>
            <Text>{params.email}</Text>
            <Form {...form}>
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem
                    fieldType="masked-input"
                    keyboardType="numeric"
                    field={field}
                    label="Código de verificação"
                    formContext={form}
                    mask="999999"
                  />
                )}
              />
              <Button
                isLoading={isPending}
                onPress={form.handleSubmit(onSubmit)}>
                <Button.Text>
                  {isPending ? 'Verificando...' : 'Confirmar código'}
                </Button.Text>
              </Button>
            </Form>
          </View>
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

import { zodResolver } from '@hookform/resolvers/zod'
import { Logo } from 'assets/icons'
import { Button } from 'components/global/button'
import { Container } from 'components/global/container'
import { FormItem } from 'components/global/form-item'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import { Form, FormField } from 'components/ui/form'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { loginSchema, type LoginSchemaInfer } from 'schemas/login'

export default function LoginScreen() {
  const form = useForm<LoginSchemaInfer>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = () => {
    console.log(form.getValues())
    alert('teste')
  }

  return (
    <KeyboardView>
      <ScrollView>
        <Container className="px-8">
          <View className="flex-1 items-center justify-center pt-10 ">
            <View className="max-w-[364px] flex-1 items-center justify-center gap-8 ">
              <Logo width={160} height={200} />
              <Text size="huge-3" weight="bold" className="text-center">
                Faça login com seu e-mail
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
                      placeholder="email@email.com"
                      formContext={form}
                    />
                  )}
                />
              </Form>
            </View>
            <Button onPress={onSubmit}>
              <Button.Text>Entrar</Button.Text>
            </Button>
          </View>
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

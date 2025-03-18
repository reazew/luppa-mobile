import { FormItem } from 'components/global/form-item'
import { Button } from 'components/ui/button'
import { Form, FormField } from 'components/ui/form'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

type FormData = {
  name: string
}

export const ExampleForm = () => {
  const form = useForm<FormData>({
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
  }

  return (
    <Form {...form}>
      <View className="flex-1 gap-4 p-4">
        <FormField
          control={form.control}
          name="name"
          rules={{ required: 'Nome é obrigatório' }}
          render={({ field }) => (
            <FormItem field={field} fieldType="input" label="Nome" placeholder="Digite aqui" />
          )}
        />

        <Button onPress={form.handleSubmit(onSubmit)}>
          <Button.Text>Salvar</Button.Text>
        </Button>
      </View>
    </Form>
  )
}

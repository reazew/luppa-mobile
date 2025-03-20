import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/global/button'
import { FormItem } from 'components/global/form-item'
import { Form, FormField } from 'components/ui/form'
import { File } from 'lucide-react-native'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  document: z
    .array(
      z.object({
        uri: z.string(),
        type: z.string(),
        fileName: z.string().optional(),
      })
    )
    .min(1, 'Selecione pelo menos uma imagem')
    .max(6, 'Máximo de 6 imagens permitidas')
    .default([]),
})

type FormData = z.infer<typeof formSchema>

export const ExampleForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: '',
      document: [],
    },
  })

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
  }

  return (
    <Form {...form}>
      <View className="flex-1 items-center gap-4 border border-red-300 p-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem
              field={field}
              icon={File}
              iconSide="left"
              fieldType="input"
              label="Nome"
              placeholder="Digite aqui"
            />
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem
              field={field}
              fieldType="select"
              label="Categoria"
              placeholder="Selecione"
              options={[
                { value: '1', label: 'Categoria 1' },
                { value: '2', label: 'Categoria 2' },
                { value: '3', label: 'Categoria 3' },
              ]}
            />
          )}
        />
        <Button onPress={form.handleSubmit(onSubmit)} className="mx-auto mt-20 w-full">
          <Button.Text>Salvar</Button.Text>
        </Button>
      </View>
    </Form>
  )
}

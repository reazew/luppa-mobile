import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/global/button'
import { FormItem } from 'components/global/form-item'
import { Text } from 'components/global/text'
import { Form, FormField } from 'components/ui/form'
import { CircleArrowRight } from 'lucide-react-native'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import type { clientOrCompanyInfer } from 'schemas/register'
import { clientOrCompanySchema } from 'schemas/register'

interface ClientOrCompanyProps {
  setStepForm: Dispatch<
    SetStateAction<'clientOrCompany' | 'basicInformation' | 'paymentMethods' | 'registrationCompleted'>
  >
}

export const ClientOrCompany = ({ setStepForm }: ClientOrCompanyProps) => {
  const form = useForm<clientOrCompanyInfer>({
    resolver: zodResolver(clientOrCompanySchema),
  })

  const { handleSubmit } = form

  function handleNextStep(data: clientOrCompanyInfer) {
    const result = clientOrCompanySchema.safeParse(data)

    if (result.success) {
      setStepForm('basicInformation')
    } else {
      form.setError('type', {
        type: 'required',
        message: 'Por favor, selecione um tipo de cadastro',
      })
    }
  }

  return (
    <View
      style={{
        flex: 1,
      }}
      className="items-center justify-between gap-[32px] px-6">
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
              className="text-center"
            />
          )}
        />
      </Form>
      <Button onPress={handleSubmit(handleNextStep)} className="mx-auto max-w-[200px]">
        <Button.Text>Avançar</Button.Text>
        <Button.Icon>
          <CircleArrowRight size={16} />
        </Button.Icon>
      </Button>
    </View>
  )
}

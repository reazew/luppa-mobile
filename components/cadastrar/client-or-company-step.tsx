import { Button } from 'components/global/button'
import { FormItem } from 'components/global/form-item'
import { Text } from 'components/global/text'
import { Form, FormField } from 'components/ui/form'
import { CircleArrowRight } from 'lucide-react-native'
import { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { View } from 'react-native'
import type { RegisterInfer } from 'schemas/register'
import { clientOrCompanySchema } from 'schemas/register'

interface ClientOrCompanyProps {
  form: UseFormReturn<RegisterInfer>
  setStepForm: Dispatch<
    SetStateAction<'clientOrCompany' | 'basicInformation' | 'paymentMethods' | 'registrationCompleted'>
  >
}

export const ClientOrCompany = ({ form, setStepForm }: ClientOrCompanyProps) => {
  const onSubmit = () => {
    const formData = form.getValues()

    const result = clientOrCompanySchema.safeParse(formData)

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
            />
          )}
        />
      </Form>
      <Button onPress={onSubmit} className="mx-auto max-w-[200px]">
        <Button.Text>Avançar</Button.Text>
        <Button.Icon>
          <CircleArrowRight size={16} />
        </Button.Icon>
      </Button>
    </View>
  )
}

import { Button } from 'components/global/button'
import { FormItem } from 'components/global/form-item'
import { Text } from 'components/global/text'
import { Form, FormField } from 'components/ui/form'
import { ArrowRight, MoveLeft } from 'lucide-react-native'
import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { View } from 'react-native'
import type { RegisterInfer } from 'schemas/register'

interface BasicInformationProps {
  form: UseFormReturn<RegisterInfer>
  setStepForm: Dispatch<
    SetStateAction<'clientOrCompany' | 'basicInformation' | 'paymentMethods' | 'registrationCompleted'>
  >
}

export const BasicInformationStep = ({ form, setStepForm }: BasicInformationProps) => {
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
        <View className="w-full flex-1 justify-start ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem field={field} fieldType="input" label="Nome" placeholder="Digite seu nome" />
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem field={field} fieldType="input" label="E-mail" placeholder="Digite seu email" />
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem
                field={field}
                fieldType="masked-input"
                label="Telefone"
                placeholder="Digite seu telefone"
                mask="(99) 99999-9999"
                keyboardType="phone-pad"
              />
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem
                field={field}
                fieldType="masked-input"
                label="Aniversário"
                maskType="date"
                mask="99/99"
                maskOptions={{
                  dateFormat: 'DD/MM',
                  maxDate: new Date(),
                  minDate: new Date(1900, 0, 1),
                }}
                placeholder="Dia/Mês"
                keyboardType="numeric"
              />
            )}
          />
        </View>
      </Form>
      <View className="flex w-full flex-row items-center justify-between gap-2">
        <Button variant="ghost" size="icon" onPress={() => setStepForm('clientOrCompany')}>
          <Button.Icon>
            <MoveLeft size={16} />
          </Button.Icon>
        </Button>
        <Button onPress={() => setStepForm('paymentMethods')} className="max-w-[200px]">
          <Button.Text>Avançar</Button.Text>
          <Button.Icon>
            <ArrowRight size={16} />
          </Button.Icon>
        </Button>
      </View>
    </View>
  )
}

import { ConfettiIcon } from 'assets/icons'
import { Button } from 'components/global/button'
import { Text } from 'components/global/text'
import { router } from 'expo-router'
import { ArrowRight, MoveLeft } from 'lucide-react-native'
import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { Alert, View } from 'react-native'
import type { RegisterInfer } from 'schemas/register'

interface RegistrationCompletedProps {
  form: UseFormReturn<RegisterInfer>
  setStepForm: Dispatch<
    SetStateAction<'clientOrCompany' | 'basicInformation' | 'paymentMethods' | 'registrationCompleted'>
  >
}

const handleSubmit = (form: UseFormReturn<RegisterInfer>) => {
  const formValues = form.getValues()
  console.log('Form Values:', formValues)
  console.log('Form State:', form.formState)
  console.log('Form Errors:', form.formState.errors)
  console.log('Is Form Valid?', form.formState.isValid)
}

export const RegistrationCompleted = ({ form, setStepForm }: RegistrationCompletedProps) => {
  return (
    <View
      style={{
        flex: 1,
      }}
      className="flex-1 items-center justify-between gap-8 px-6">
      <Text size="huge-2" weight="bold" className="w-full text-left">
        Cadastro concluído com sucesso!
      </Text>
      <View className="w-full flex-1 items-center justify-center gap-8">
        <ConfettiIcon />
        <Text size="huge-3" weight="bold" className="text-center">
          Parabéns!
        </Text>
        <Text size="md" weight="regular" className="mt-2 text-center text-white">
          Você já pode aproveitar todos os benefícios de usar a Luppa!
        </Text>
      </View>

      <View className="flex w-full flex-row items-center justify-between gap-2">
        <Button variant="ghost" size="icon" onPress={() => setStepForm('paymentMethods')}>
          <Button.Icon>
            <MoveLeft size={16} />
          </Button.Icon>
        </Button>
        <Button
          onPress={() => {
            handleSubmit(form)
            Alert.alert('Completed!', 'It should complete the user registration.')
            router.push('/(private)/(cliente)/inicio')
          }}
          className="max-w-[200px]">
          <Button.Text>Concluir</Button.Text>
          <Button.Icon>
            <ArrowRight size={16} />
          </Button.Icon>
        </Button>
      </View>
    </View>
  )
}

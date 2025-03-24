import { Button } from 'components/global/button'
import { Text } from 'components/global/text'
import { ArrowRight, MoveLeft } from 'lucide-react-native'
import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { Alert, View } from 'react-native'
import type { RegisterInfer } from 'schemas/register'

interface RegistrationCompletedProps {
  form: UseFormReturn<RegisterInfer>
  setStepForm: Dispatch<SetStateAction<'clientOrCompany' | 'basicInformation' | 'paymentMethods' | 'registrationCompleted'>>
}

const handleSubmit = (form: UseFormReturn<RegisterInfer>) => {
  console.log(form.getValues())
}

export const RegistrationCompleted = ({ form, setStepForm }: RegistrationCompletedProps) => {
  return (
    <View className="flex-1 items-center justify-between px-6">
      <Text>RegistrationCompleted</Text>
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

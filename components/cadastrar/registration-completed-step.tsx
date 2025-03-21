import { Button } from 'components/global/button'
import { Text } from 'components/global/text'
import { ArrowRight, MoveLeft } from 'lucide-react-native'
import type { Dispatch, SetStateAction } from 'react'
import { Alert, View } from 'react-native'

interface RegistrationCompletedProps {
  setStepForm: Dispatch<
    SetStateAction<
      'clientOrCompany' | 'basicInformation' | 'paymentMethods' | 'registrationCompleted'
    >
  >
}
export const RegistrationCompleted = ({ setStepForm }: RegistrationCompletedProps) => {
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

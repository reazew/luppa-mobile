import { Button } from 'components/global/button'
import { Text } from 'components/global/text'
import { ArrowRight, MoveLeft } from 'lucide-react-native'
import type { Dispatch, SetStateAction } from 'react'
import { View } from 'react-native'

interface BasicInformationProps {
  setStepForm: Dispatch<
    SetStateAction<
      'clientOrCompany' | 'basicInformation' | 'paymentMethods' | 'registrationCompleted'
    >
  >
}

export const BasicInformationStep = ({ setStepForm }: BasicInformationProps) => {
  return (
    <View className="flex-1 items-center justify-between px-6">
      <Text>BasicInformationStep</Text>
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

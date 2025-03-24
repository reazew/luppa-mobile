import { Button } from 'components/global/button'
import { Text } from 'components/global/text'
import { ToggleGroup, ToggleGroupItem } from 'components/ui/toggle-group'
import { ArrowRight, MoveLeft } from 'lucide-react-native'
import type { Dispatch, SetStateAction } from 'react'
import React from 'react'
import { View } from 'react-native'

interface PaymentMethodsProps {
  setStepForm: Dispatch<
    SetStateAction<
      'clientOrCompany' | 'basicInformation' | 'paymentMethods' | 'registrationCompleted'
    >
  >
}
export const PaymentMethodsStep = ({ setStepForm }: PaymentMethodsProps) => {
  const [value, setValue] = React.useState('a')
  return (
    <View
      style={{
        flex: 1,
      }}
      className="flex-1 items-center justify-between gap-8 px-6">
      <Text size="huge-2" weight="bold" className="w-full text-left">
        Métodos de pagamento
      </Text>
      <View className="w-full flex-1 gap-8">
        <ToggleGroup type="single" value={value} onValueChange={setValue}>
          <ToggleGroupItem
            value="pix"
            label="Pix"
            variant="pix"
            description="Conecte com seu banco através da nossa ferramenta"
          />
          <ToggleGroupItem
            value="creditCard"
            label="Cartão de crédito"
            variant="credit-card"
            description="Conecte com seu banco através da nossa ferramenta"
          />
          <ToggleGroupItem
            value="debitCard"
            label="Cartão de débito"
            variant="debit-card"
            description="Conecte com seu banco através da nossa ferramenta"
          />
        </ToggleGroup>
      </View>
      <View className="flex w-full flex-row items-center justify-between gap-2">
        <Button variant="ghost" size="icon" onPress={() => setStepForm('basicInformation')}>
          <Button.Icon>
            <MoveLeft size={16} />
          </Button.Icon>
        </Button>
        <Button onPress={() => setStepForm('registrationCompleted')} className="max-w-[200px]">
          <Button.Text>Avançar</Button.Text>
          <Button.Icon>
            <ArrowRight size={16} />
          </Button.Icon>
        </Button>
      </View>
    </View>
  )
}

import { CreditCardActiveIcon, DebitCardActiveIcon, PixActiveIcon } from 'assets/icons'
import { PaymentMethod } from 'components/cadastrar/payment-method'
import { Button } from 'components/global/button'
import { Text } from 'components/global/text'
import { ArrowRight, MoveLeft } from 'lucide-react-native'
import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { View } from 'react-native'
import type { RegisterClientInfer } from 'schemas/register'

interface PaymentMethodsProps {
  form: UseFormReturn<RegisterClientInfer>
  setStepForm: Dispatch<
    SetStateAction<'clientOrCompany' | 'basicInformation' | 'paymentMethods' | 'registrationCompleted'>
  >
}
export const PaymentMethodsStep = ({ form, setStepForm }: PaymentMethodsProps) => {
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
        <PaymentMethod
          label="Pix"
          description="Conecte com seu banco através da nossa ferramenta"
          icon={<PixActiveIcon />}
        />
        <PaymentMethod
          label="Cartão de crédito"
          description="Conecte com seu banco através da nossa ferramenta"
          icon={<CreditCardActiveIcon />}
        />
        <PaymentMethod
          label="Cartão de débito"
          description="Conecte com seu banco através da nossa ferramenta"
          icon={<DebitCardActiveIcon />}
        />
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

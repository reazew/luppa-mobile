import {
  CreditCardActiveIcon,
  DebitCardActiveIcon,
  PixActiveIcon,
} from 'assets/icons'
import { PaymentMethod } from 'components/cadastrar/payment-method'
import { Button } from 'components/global/button'
import { Container } from 'components/global/container'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import { router } from 'expo-router'
import { CircleArrowRight, MoveLeft } from 'lucide-react-native'
import { View } from 'react-native'
import { useStepStore } from 'store/useStepStore'

export default function FormStepPaymentMethods() {
  const { nextStep } = useStepStore()

  const handleBack = () => {
    router.back()
  }

  const handleNext = () => {
    router.push('/form-step-registration-completed')
    nextStep()
  }

  return (
    <KeyboardView>
      <ScrollView>
        <Container hasHeader className="items-center justify-between px-6">
          <Text
            size="huge-2"
            weight="bold"
            className="w-full pb-[32px] text-left">
            Nos conte sobre você
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
            <Button variant="ghost" size="icon" onPress={handleBack}>
              <Button.Icon>
                <MoveLeft size={16} />
              </Button.Icon>
            </Button>
            <Button onPress={handleNext} className="max-w-[200px]">
              <Button.Text>Avançar</Button.Text>
              <Button.Icon>
                <CircleArrowRight size={16} />
              </Button.Icon>
            </Button>
          </View>
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

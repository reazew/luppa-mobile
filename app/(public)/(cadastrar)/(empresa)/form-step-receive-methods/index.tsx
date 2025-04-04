import {
  CreditCardActiveIcon,
  DebitCardActiveIcon,
  PixActiveIcon,
} from 'assets/icons'
import { PaymentMethod } from 'components/cadastrar/payment-method'
import { Button } from 'components/global/button'
import { Container } from 'components/global/container'
import { Heading } from 'components/global/heading'
import { KeyboardView } from 'components/global/keyboard-view'
import { MessageBubble } from 'components/global/message-bubble'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import { router } from 'expo-router'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react-native'
import { View } from 'react-native'
import { useStepStore } from 'store/useStepStore'

export default function FormStepReceiveMethods() {
  const { setStep } = useStepStore()

  const handleBack = () => {
    router.back()
  }

  const handleNext = () => {
    router.navigate('/registration-business-completed')
    setStep(6)
  }

  return (
    <KeyboardView>
      <ScrollView>
        <Container
          hasHeader
          className="items-center justify-between gap-8 px-6">
          <Heading>Nos conte sobre você</Heading>
          <MessageBubble>
            <Text size="sm" weight="regular">
              Você precisa ter pelo menos um método de recebimento aceito em seu
              Negócio para utilizar o luppa.
            </Text>
          </MessageBubble>
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
            <Button
              variant="ghost"
              size="icon"
              onPress={handleBack}
              className="w-1/2 max-w-[189px]">
              <Button.Icon>
                <CircleArrowLeft size={16} />
              </Button.Icon>
              <Button.Text>Voltar</Button.Text>
            </Button>
            <Button onPress={handleNext} className="w-1/2 max-w-[189px]">
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

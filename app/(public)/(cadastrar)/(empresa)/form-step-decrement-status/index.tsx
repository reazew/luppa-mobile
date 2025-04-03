import { RegisterDecrementStatus } from 'components/cadastrar/empresa/register-decrement-status'
import { Container } from 'components/global/container'
import { Heading } from 'components/global/heading'
import { KeyboardView } from 'components/global/keyboard-view'
import { MessageBubble } from 'components/global/message-bubble'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import type { User } from 'types/user'

export default function FormStepDecrementStatus() {
  const decrementStatusData: User = {
    type: 'business',
    status: {
      diamond: { decrementPoints: '', expirationTime: '' },
      gold: { decrementPoints: '', expirationTime: '' },
      silver: { decrementPoints: '', expirationTime: '' },
    },
  }

  return (
    <KeyboardView>
      <ScrollView>
        <Container hasHeader className="items-center gap-8 px-6">
          <Heading>Diminuição de pontos</Heading>
          <MessageBubble>
            <Text size="sm" weight="regular">
              Defina a quantidade de pontos subtraída do saldo do seu cliente a
              cada mês sem consumo no seu Negócio.
            </Text>
          </MessageBubble>
          <RegisterDecrementStatus {...decrementStatusData} />
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

import { RegisterBonusStatus } from 'components/cadastrar/empresa/register-bonus-status'
import { Container } from 'components/global/container'
import { Heading } from 'components/global/heading'
import { KeyboardView } from 'components/global/keyboard-view'
import { MessageBubble } from 'components/global/message-bubble'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import type { User } from 'types/user'

export default function FormStepBonusStatus() {
  const bonusStatusData: User = {
    type: 'business',
    status: {
      diamond: {
        minimumPoints: '',
        description: '',
      },
      gold: {
        minimumPoints: '',
        description: '',
      },
      silver: {
        minimumPoints: '',
        description: '',
      },
    },
  }

  return (
    <KeyboardView>
      <ScrollView>
        <Container hasHeader className="items-center gap-8 px-6">
          <Heading>Bonificação</Heading>
          <MessageBubble>
            <Text size="sm" weight="regular">
              O seu cliente receberá 1 ponto a cada R$1,00 gasto em seu Negócio.
              Defina os benefícios para quando ele atingir o status de Diamante,
              Ouro e Prata.
            </Text>
          </MessageBubble>
          <RegisterBonusStatus {...bonusStatusData} />
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

import { Container } from 'components/global/container'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'

export default function Home() {
  return (
    <KeyboardView>
      <ScrollView>
        <Container>
          <Text className="text-center">Cliente - Início</Text>
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

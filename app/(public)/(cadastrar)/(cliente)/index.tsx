import { RegisterClientForm } from 'components/auth/cadastrar/cliente/register-client-form'
import { Container } from 'components/global/container'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import { useLocalSearchParams } from 'expo-router'

type ParamsProps = {
  email: string
  role: string
}

export default function FormStepRegisterClient() {
  const params = useLocalSearchParams<ParamsProps>()

  return (
    <KeyboardView>
      <ScrollView>
        <Container hasHeader className="items-center justify-between px-6">
          <Text
            size="huge-2"
            weight="bold"
            className="w-full pb-[32px] text-left">
            Informações básicas
          </Text>
          <RegisterClientForm {...params} />
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

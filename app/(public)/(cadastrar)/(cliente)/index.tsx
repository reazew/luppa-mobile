import { RegisterClientForm } from 'components/cadastrar/cliente/register-client-form'
import { Container } from 'components/global/container'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import type { User } from 'types/user'

export default function FormStepRegisterClient() {
  const clientUserData: User = {
    type: 'client',
    name: '',
    cpf: '',
    email: '',
    phone: '',
    birthDate: '',
    imageUrl: undefined,
  }

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
          <RegisterClientForm {...clientUserData} />
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

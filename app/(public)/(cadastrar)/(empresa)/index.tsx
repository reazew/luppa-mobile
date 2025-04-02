import { RegisterBusinessForm } from 'components/cadastrar/empresa/register-business-form'
import { Container } from 'components/global/container'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import type { BusinessUser } from 'types/business-user'

export default function FormStepRegisterLegalResponsible() {
  const businessUserData: BusinessUser = {
    name: '',
    cpf: '',
    email: '',
    phone: '',
    document: null,
  }
  return (
    <KeyboardView>
      <ScrollView>
        <Container hasHeader className="items-center justify-between px-6">
          <Text
            size="huge-2"
            weight="bold"
            className="w-full pb-[32px] text-left">
            Informações sobre o responsável legal
          </Text>
          <RegisterBusinessForm {...businessUserData} />
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

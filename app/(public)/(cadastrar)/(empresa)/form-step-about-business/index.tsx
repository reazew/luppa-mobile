import { RegisterBusinessForm } from 'components/cadastrar/empresa/register-business-form'
import { Container } from 'components/global/container'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import type { User } from 'types/user'

export default function FormStepAboutBusiness() {
  const businessData: User = {
    type: 'business',
    name: '',
    cnpj: '',
    segment: '',
    address: '',
    city: '',
    state: '',
    cep: '',
    imageUrl: '',
    logoUrl: '',
  }

  return (
    <KeyboardView>
      <ScrollView>
        <Container hasHeader className="items-center justify-between px-6">
          <Text
            size="huge-2"
            weight="bold"
            className="w-full pb-[32px] text-left">
            Informações sobre o seu negócio
          </Text>
          <RegisterBusinessForm {...businessData} />
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

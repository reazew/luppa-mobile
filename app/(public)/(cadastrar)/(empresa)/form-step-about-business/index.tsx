import { RegisterBusinessForm } from 'components/auth/cadastrar/empresa/register-business-form'
import { Container } from 'components/global/container'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'

export default function FormStepAboutBusiness() {
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
          <RegisterBusinessForm />
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

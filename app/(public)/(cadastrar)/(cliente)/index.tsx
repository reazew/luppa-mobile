import { RegisterClientForm } from 'components/cadastrar/cliente/register-client-form'
import { Container } from 'components/global/container'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import { useEffect } from 'react'
import { useStepStore } from 'store/useStepStore'
import type { User } from 'types/user'

export default function FormStepRegisterClient() {
  const resetStep = useStepStore((state) => state.resetStep)

  useEffect(() => {
    resetStep()
  }, [])

  const clientUserData: User = {
    type: 'client',
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    imageUrl: '',
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

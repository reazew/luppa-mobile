import { RegisterGalleryForm } from 'components/auth/cadastrar/empresa/register-gallery-form'
import { Container } from 'components/global/container'
import { Heading } from 'components/global/heading'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'

export default function FormStepGallery() {
  return (
    <KeyboardView>
      <ScrollView>
        <Container
          hasHeader
          className="items-center justify-between gap-8 px-6">
          <Heading>Alguns toques finais</Heading>
          <RegisterGalleryForm />
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

import { RegisterGalleryForm } from 'components/cadastrar/empresa/register-gallery-form'
import { Container } from 'components/global/container'
import { Heading } from 'components/global/heading'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import type { User } from 'types/user'

export default function FormStepGallery() {
  const businessUserData: User = {
    type: 'business',
    description: '',
    galleryImagesUrls: [],
  }

  return (
    <KeyboardView>
      <ScrollView>
        <Container
          hasHeader
          className="items-center justify-between gap-8 px-6">
          <Heading>Alguns toques finais</Heading>
          <RegisterGalleryForm {...businessUserData} />
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

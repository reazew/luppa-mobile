import { Button } from 'components/global/button'
import { Container } from 'components/global/container'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import { router } from 'expo-router'
import { Alert } from 'react-native'
import { useUserStore } from 'store/useUserStore'

export default function ClientHomeScreen() {
  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            const clearUser = useUserStore.getState().clearUser
            clearUser()
            router.replace('/(public)')
          },
        },
      ],
      { cancelable: false }
    )
  }
  return (
    <KeyboardView>
      <ScrollView>
        <Container>
          <Text size="huge" className="text-center">
            Cliente - Início
          </Text>
          {useUserStore.getState().token ? (
            <Button onPress={handleLogout}>
              <Button.Text>Sair</Button.Text>
            </Button>
          ) : (
            <Button onPress={() => router.replace('/(public)')}>
              <Button.Text>Voltar e fazer login</Button.Text>
            </Button>
          )}
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

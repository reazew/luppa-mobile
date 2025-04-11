import { Button } from 'components/global/button'
import { Container } from 'components/global/container'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import { router } from 'expo-router'
import { Alert } from 'react-native'
import { useUserStore } from 'store/useUserStore'

export default function BusinessHomeScreen() {
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
            router.replace('/(public)/(login)')
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
            Empresa - Início
          </Text>
          <Button onPress={handleLogout}>
            <Button.Text>Sair</Button.Text>
          </Button>
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

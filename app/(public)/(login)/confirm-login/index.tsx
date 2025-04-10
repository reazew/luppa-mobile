import { Container } from 'components/global/container'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import { useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'

export default function ConfirmLoginScreen() {
  const { email } = useLocalSearchParams()

  return (
    <KeyboardView>
      <ScrollView>
        <Container className="px-8">
          <View className="flex-1 items-center justify-center pt-10 ">
            <Text>Confirmar login</Text>
            <Text>{email}</Text>
          </View>
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

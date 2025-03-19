import { Button } from 'components/ui/button'
import { router } from 'expo-router'
import { View } from 'react-native'

export default function Login() {
  return (
    <View className="flex-1 items-center justify-center gap-10 bg-black-500 py-10">
      <Button onPress={() => router.push('/(private)/(cliente)/inicio')}>
        <Button.Text>Area do cliente</Button.Text>
      </Button>
    </View>
  )
}

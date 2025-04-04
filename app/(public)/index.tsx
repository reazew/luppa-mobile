import { GoogleLogo, Logo } from 'assets/icons'
import { Button } from 'components/global/button'
import { ContainerBackground } from 'components/global/container-background'
import { Text } from 'components/global/text'
import { router } from 'expo-router'
import { View } from 'react-native'

export default function PublicScreen() {
  return (
    <ContainerBackground
      className="px-8"
      source={require('../../assets/images/home-background.png')}>
      <View className="flex-1 items-center justify-center gap-10 pt-10">
        <View className="max-w-[364px] flex-1 items-center justify-center gap-8 ">
          <Logo width={160} height={200} />
          <Text size="huge-3" weight="bold" className="text-center">
            Descubra, fidelize e cresça
          </Text>
          <Text
            size="md"
            weight="regular"
            className="mt-2 text-center text-white">
            Cadastre-se agora e faça parte desse clube!
          </Text>
        </View>
        <View className="w-full items-center justify-center gap-4">
          <Button onPress={() => router.navigate('/(public)/onboarding')}>
            <Button.Text>Continue com e-mail</Button.Text>
          </Button>
          <Button
            onPress={() => router.navigate('/(private)/(empresa)/inicio')}
            className="bg-black-0">
            <Button.Icon>
              <GoogleLogo width={16} height={16} />
            </Button.Icon>
            <Text size="md" weight="regular" className="text-black-100">
              Continue com o Google
            </Text>
          </Button>
          <Button
            variant="outline"
            onPress={() => router.push('/(public)/onboarding')}>
            <Button.Text>Continue sem logar</Button.Text>
          </Button>
        </View>
      </View>
    </ContainerBackground>
  )
}

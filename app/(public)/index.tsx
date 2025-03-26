import { GoogleLogo, Logo } from 'assets/icons'
import { Button } from 'components/global/button'
import { Text } from 'components/global/text'
import { router } from 'expo-router'
import { bottomBarHeight, cn, statusBarHeight } from 'lib/util'
import { ImageBackground, Platform, View } from 'react-native'

export default function PublicScreen() {
  return (
    <ImageBackground
      source={require('../../assets/images/onboading-screen-start.png')}
      className={cn('flex-1 px-8', Platform.OS === 'ios' ? `pb-[${bottomBarHeight + 32}px]` : `pb-8`)}
      style={{
        paddingTop: statusBarHeight,
      }}>
      <View className="flex-1 items-center justify-center gap-10 pt-10">
        <View className="max-w-[364px] flex-1 items-center justify-center gap-8 ">
          <Logo width={160} height={200} />
          <Text size="huge-3" weight="bold" className="text-center">
            Descubra, fidelize e cresça
          </Text>
          <Text size="md" weight="regular" className="mt-2 text-center text-white">
            Cadastre-se agora e faça parte desse clube!
          </Text>
        </View>
        <View className="w-full items-center justify-center gap-4">
          <Button onPress={() => router.push('/(public)/(cadastrar)')}>
            <Button.Text>Continue com e-mail</Button.Text>
          </Button>
          <Button onPress={() => router.navigate('/(private)/(empresa)/inicio')} className="bg-black-0">
            <Button.Icon>
              <GoogleLogo width={16} height={16} />
            </Button.Icon>
            <Text size="md" weight="regular" className="text-black-100">
              Continue com o Google
            </Text>
          </Button>
          <Button variant="outline" onPress={() => router.push('/(private)/(cliente)/inicio')}>
            <Button.Text>Continue sem logar</Button.Text>
          </Button>
        </View>
      </View>
    </ImageBackground>
  )
}

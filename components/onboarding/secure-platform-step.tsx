import { VerifiedCheckIcon } from 'assets/icons'
import { Button } from 'components/global/button'
import { Text } from 'components/global/text'
import { router } from 'expo-router'
import { ImageBackground, View } from 'react-native'
import { useUserStore } from 'store/useUserStore'

export const SecurePlatformStep = () => {
  const { markOnboardingAsSeen } = useUserStore()

  const handleFinishOnboarding = () => {
    markOnboardingAsSeen()
    router.replace('/(public)')
  }

  return (
    <ImageBackground
      source={require('../../assets/images/onboading-step-3.png')}
      resizeMode="cover"
      className="flex-1 px-6">
      <View className="flex-1 items-center justify-center gap-10 pb-[66px] pt-10">
        <View className="mb-10 w-full max-w-[364px] flex-1 items-start justify-end gap-6">
          <VerifiedCheckIcon width={64} height={64} />
          <Text size="huge-2" weight="regular" className="mt-2">
            Plataforma segura em parceria com os maiores bancos e meios de
            pagamento do país
          </Text>
        </View>
        <View className="w-full items-center justify-center gap-4">
          <Button onPress={handleFinishOnboarding} className="max-w-[200px]">
            <Button.Text>Cadastrar</Button.Text>
          </Button>
        </View>
      </View>
    </ImageBackground>
  )
}

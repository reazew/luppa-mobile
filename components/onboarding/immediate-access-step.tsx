import { ShopActiveIcon } from 'assets/icons'
import { Button } from 'components/global/button'
import { Text } from 'components/global/text'
import { CircleArrowRight } from 'lucide-react-native'
import { ImageBackground, View } from 'react-native'

export const ImmediateAccessStep = ({ setStepOnboarding }: { setStepOnboarding: () => void }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/onboading-step-2.png')}
      resizeMode="cover"
      className="flex-1 px-6">
      <View className="flex-1 items-center justify-center gap-10 pb-[66px] pt-10">
        <View className="mb-10 w-full max-w-[364px] flex-1 items-start justify-end gap-6">
          <ShopActiveIcon width={64} height={64} />
          <Text size="huge-2" weight="regular" className="mt-2">
            Acesso imediato a uma rede de serviços e benefícios exclusivos
          </Text>
        </View>
        <View className="w-full items-center justify-center gap-4">
          <Button onPress={setStepOnboarding} className="max-w-[200px]">
            <Button.Text>Avançar</Button.Text>
            <Button.Icon>
              <CircleArrowRight size={16} />
            </Button.Icon>
          </Button>
        </View>
      </View>
    </ImageBackground>
  )
}

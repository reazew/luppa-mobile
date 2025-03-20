import { ShopIcon } from 'assets/images/svg'
import { Button } from 'components/global/button'
import { Text } from 'components/global/text'
import { cn } from 'lib/util'
import { CircleArrowRight } from 'lucide-react-native'
import { ImageBackground, Platform, View } from 'react-native'

export const ImmediateAccessStep = ({ setStepOnboarding }: { setStepOnboarding: () => void }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/onboading-step-2.png')}
      resizeMode="cover"
      className="flex-1 px-8">
      <View
        className={cn(
          'flex-1 items-center justify-center gap-10 pt-10',
          Platform.OS === 'ios' ? `pb-20` : `pb-20`
        )}>
        <View className="mb-10 w-full max-w-[364px] flex-1 items-start justify-end gap-6">
          <ShopIcon width={64} height={64} />
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

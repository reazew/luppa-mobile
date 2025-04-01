import { Button } from 'components/global/button'
import { ContainerBackground } from 'components/global/container-background'
import { Text } from 'components/global/text'
import { CircleArrowRight } from 'lucide-react-native'
import { View } from 'react-native'

export default function RegistrationClientCompleted() {
  return (
    <ContainerBackground
      className="px-6"
      source={require('../../../../../assets/images/home-background.png')}>
      <View className="flex-1 items-center justify-center gap-10 pt-10">
        <View className="max-w-[364px] flex-1 items-center justify-center gap-8 ">
          <Text size="huge-3" weight="bold" className="text-center">
            Cadastros realizados com sucesso!
          </Text>
          <Text
            size="md"
            weight="regular"
            className="mt-2 text-center text-white">
            Você já pode aproveitar todos os benefícios de usar a luppa!
          </Text>
        </View>
        <View className="w-full items-center justify-center gap-4">
          <Button>
            <Button.Text>Concluir</Button.Text>
            <Button.Icon>
              <CircleArrowRight size={24} />
            </Button.Icon>
          </Button>
        </View>
      </View>
    </ContainerBackground>
  )
}

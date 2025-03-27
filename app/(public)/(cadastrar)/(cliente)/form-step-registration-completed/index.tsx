import { ConfettiIcon } from 'assets/icons'
import { Button } from 'components/global/button'
import { Container } from 'components/global/container'
import { KeyboardView } from 'components/global/keyboard-view'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import { router } from 'expo-router'
import { ArrowRight } from 'lucide-react-native'
import { useEffect } from 'react'
import { Alert, View } from 'react-native'
import { useStepStore } from 'store/useStepStore'

export default function FormStepRegistrationCompleted() {
  const setCurrentStep = useStepStore((state) => state.setCurrentStep)

  useEffect(() => {
    setCurrentStep(3)
  }, [])

  const handleNext = () => {
    Alert.alert('Completed!', 'It should complete the user registration.')
    router.navigate('/(private)/(cliente)/inicio')
  }

  return (
    <KeyboardView>
      <ScrollView>
        <Container hasHeader className="items-center justify-between px-6">
          <Text size="huge-2" weight="bold" className="w-full pb-[32px] text-left">
            Cadastro concluído com sucesso!
          </Text>
          <View className="w-full flex-1 items-center justify-center gap-8">
            <ConfettiIcon />
            <Text size="huge-3" weight="bold" className="text-center">
              Parabéns!
            </Text>
            <Text size="md" weight="regular" className="mt-2 text-center text-white">
              Você já pode aproveitar todos os benefícios de usar a Luppa!
            </Text>
          </View>
          <View className="flex w-full flex-row items-center justify-center gap-2">
            <Button onPress={handleNext} className="max-w-[200px]">
              <Button.Text>Concluir</Button.Text>
              <Button.Icon>
                <ArrowRight size={16} />
              </Button.Icon>
            </Button>
          </View>
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

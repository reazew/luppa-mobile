import { Steps } from 'components/cadastrar/steps'
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { useStepStore } from 'store/useStepStore'

export default function RegisterLayout() {
  const currentStep = useStepStore((state) => state.currentStep)
  const resetStep = useStepStore((state) => state.resetStep)

  useEffect(() => {
    resetStep()
  }, [])

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: '#242424',
        },
        headerStyle: {
          backgroundColor: '#242424',
        },
        header: () => <Steps currentStepIndex={currentStep} />,
        animationTypeForReplace: 'pop',
        presentation: 'transparentModal',
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="(cliente)" />
      <Stack.Screen name="(empresa)" />
    </Stack>
  )
}

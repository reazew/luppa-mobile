import { Steps } from 'components/cadastrar/steps'
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { useStepStore } from 'store/useStepStore'

export default function RegisterCompanyLayout() {
  const { previousStep } = useStepStore()
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
        header: () => <Steps currentStepIndex={currentStep} totalSteps={7} />,
        animation: 'none',
      }}
      screenListeners={{
        beforeRemove: () => {
          previousStep()
        },
      }}>
      <Stack.Screen name="form-step-about-legal-guardian" />
    </Stack>
  )
}

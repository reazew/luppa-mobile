import { Steps } from 'components/cadastrar/steps'
import { Stack } from 'expo-router'
import { useStepStore } from 'store/useStepStore'

export default function RegisterClientLayout() {
  const { previousStep } = useStepStore()
  const currentStep = useStepStore((state) => state.currentStep)
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: '#242424',
        },
        headerStyle: {
          backgroundColor: '#242424',
        },
        header: () => <Steps currentStepIndex={currentStep} totalSteps={3} />,
        animation: 'none',
      }}
      screenListeners={{
        beforeRemove: () => {
          previousStep()
        },
      }}>
      <Stack.Screen name="form-step-payment-methods" />
      <Stack.Screen name="form-step-registration-completed" />
    </Stack>
  )
}

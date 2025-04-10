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
          backgroundColor: '#1F1F1F',
        },
        headerStyle: {
          backgroundColor: '#1F1F1F',
        },
        header: () => <Steps currentStepIndex={currentStep} totalSteps={3} />,
        animation: 'none',
      }}
      screenListeners={{
        beforeRemove: () => {
          previousStep()
        },
      }}>
      <Stack.Screen
        name="form-step-payment-methods"
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="registration-client-completed"
        options={{
          headerTransparent: true,
          contentStyle: {
            borderColor: 'red',
          },
          gestureEnabled: false,
        }}
      />
    </Stack>
  )
}

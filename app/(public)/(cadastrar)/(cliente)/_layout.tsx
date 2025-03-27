import { Stack } from 'expo-router'
import { useStepStore } from 'store/useStepStore'

export default function RegisterClientLayout() {
  const { previousStep } = useStepStore()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
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

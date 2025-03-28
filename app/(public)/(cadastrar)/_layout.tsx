import { Stack } from 'expo-router'
import { useStepStore } from 'store/useStepStore'

export default function RegisterLayout() {
  const { previousStep } = useStepStore()

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      screenListeners={{
        beforeRemove: () => {
          previousStep()
        },
      }}>
      <Stack.Screen name="(cliente)" />
      <Stack.Screen name="(empresa)" />
    </Stack>
  )
}

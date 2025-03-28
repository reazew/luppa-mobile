import { Stack } from 'expo-router'
import { useStepStore } from 'store/useStepStore'

export default function Layout() {
  const { previousStep } = useStepStore()

  return <Stack screenOptions={{ headerShown: false }} screenListeners={{ beforeRemove: () => previousStep() }} />
}

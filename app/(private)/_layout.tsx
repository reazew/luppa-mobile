import { Stack } from 'expo-router'

export default function PrivateLayout() {
  return (
    <Stack>
      <Stack.Screen name="(cliente)" options={{ headerShown: false }} />
      <Stack.Screen name="(empresa)" options={{ headerShown: false }} />
    </Stack>
  )
}

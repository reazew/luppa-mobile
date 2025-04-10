import { Stack } from 'expo-router'

export default function PrivateLayout() {
  const role = 'client'
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        contentStyle: {
          backgroundColor: '#1F1F1F',
        },
        headerStyle: {
          backgroundColor: '#1F1F1F',
        },
      }}>
      {role === 'client' ? (
        <Stack.Screen name="(cliente)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(empresa)" options={{ headerShown: false }} />
      )}
    </Stack>
  )
}

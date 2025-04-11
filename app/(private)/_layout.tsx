import { Stack } from 'expo-router'
import { useUserStore } from 'store/useUserStore'

export default function PrivateLayout() {
  const role = useUserStore((state) => state.role)
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

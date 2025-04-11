import { Stack } from 'expo-router'

export default function PublicLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#1F1F1F',
        },
        headerStyle: {
          backgroundColor: '#1F1F1F',
        },
      }}>
      <Stack.Screen name="(cadastrar)" />
      <Stack.Screen name="(login)" />
    </Stack>
  )
}

import { Stack } from 'expo-router'

export default function RegisterCompanyLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="form-step-about-legal-guardian" />
    </Stack>
  )
}

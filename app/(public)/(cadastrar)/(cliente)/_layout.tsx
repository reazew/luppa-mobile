import { RegisterClientFormProvider } from 'context/register-client-context'
import { Stack } from 'expo-router'

export default function RegisterClientLayout() {
  return (
    <RegisterClientFormProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="form-step-basic-information" />
      </Stack>
    </RegisterClientFormProvider>
  )
}

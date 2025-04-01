import { StatusContextFormProvider } from 'context/status-context-form'
import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <StatusContextFormProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </StatusContextFormProvider>
  )
}

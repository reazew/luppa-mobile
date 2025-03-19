import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated'
import '../styles/global.css'

const queryClient = new QueryClient()

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})

export default function RootLayout() {
  const auth = true

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        {auth ? (
          <Stack.Screen name="(private)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(public)" options={{ headerShown: false }} />
        )}
      </Stack>
    </QueryClientProvider>
  )
}

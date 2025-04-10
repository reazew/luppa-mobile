import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  useFonts,
} from '@expo-google-fonts/manrope'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated'
import '../styles/global.css'

const queryClient = new QueryClient()

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})

export default function RootLayout() {
  const [loaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  })

  if (!loaded) {
    SplashScreen.preventAutoHideAsync()
  }

  const auth = true

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
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
          {auth ? (
            <Stack.Screen name="(private)" options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="(public)" options={{ headerShown: false }} />
          )}
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}

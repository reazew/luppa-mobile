import { Tabs } from 'expo-router'

export default function PrivateLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="(cliente)" options={{ headerShown: false }} />
      <Tabs.Screen name="(empresa)" options={{ headerShown: false }} />
    </Tabs>
  )
}

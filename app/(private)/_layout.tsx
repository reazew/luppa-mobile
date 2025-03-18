import { Tabs } from 'expo-router'

export default function PrivateLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
    </Tabs>
  )
}

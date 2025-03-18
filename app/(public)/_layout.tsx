import { Tabs } from 'expo-router'

export default function PublicLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
    </Tabs>
  )
}

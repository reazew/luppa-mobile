import { TabBar } from 'components/layout/tab-bar'
import { Tabs } from 'expo-router'
import { Platform } from 'react-native'

export default function ClientLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: '#B0B0B0',
        tabBarHideOnKeyboard: Platform.OS !== 'ios',
      }}>
      <Tabs.Screen name="meu-status" />
      <Tabs.Screen name="pagamento" />
      <Tabs.Screen name="inicio" />
      <Tabs.Screen name="empresas" />
      <Tabs.Screen name="notificacoes" />
    </Tabs>
  )
}

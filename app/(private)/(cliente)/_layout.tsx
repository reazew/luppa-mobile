import { HouseActiveIcon } from 'assets/icons'
import { Tabs } from 'expo-router'
import { HouseIcon } from 'lucide-react-native'
import { Platform } from 'react-native'

export default function ClientLayout() {
  return (
    <Tabs
      screenOptions={(props) => {
        return {
          headerShown: false,
          tabBarActiveTintColor: '#FF0000',
          tabBarInactiveTintColor: '#525252',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            height: Platform.OS === 'ios' ? 85 : 75,
          },
          tabBarHideOnKeyboard: Platform.OS !== 'ios',
        }
      }}>
      <Tabs.Screen
        name="meu-status"
        options={{
          tabBarIcon: (props) => {
            return props.focused ? <HouseActiveIcon /> : <HouseIcon />
          },
        }}
      />
    </Tabs>
  )
}

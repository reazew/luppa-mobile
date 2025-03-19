import {
  EllipseActiveIcon,
  HouseActiveIcon,
  StoreActiveIcon,
  UsersRoundActiveIcon,
} from 'assets/icons'
import Constants from 'expo-constants'
import { Tabs } from 'expo-router'
import { House, Store, UsersRound } from 'lucide-react-native'
import { Platform, View } from 'react-native'

const statusBarHeight = Constants.statusBarHeight

export default function CompanyLayout() {
  return (
    <Tabs
      screenOptions={(props) => {
        return {
          headerShown: false,
          headerShadowVisible: false,
          tabBarShowLabel: false,
          tabBarInactiveTintColor: '#B0B0B0',
          tabBarStyle: {
            backgroundColor: '#242424',
            borderTopWidth: 1,
            paddingHorizontal: 8,
            paddingTop: 20,
            paddingBottom: Platform.OS === 'ios' ? statusBarHeight + 20 : 0,
            height: Platform.OS === 'ios' ? 75 : 75,
          },
          tabBarHideOnKeyboard: Platform.OS !== 'ios',
        }
      }}>
      <Tabs.Screen
        name="clientes"
        options={{
          title: 'Clientes',
          headerShown: false,
          tabBarIcon: (props) => {
            return (
              <View className="flex flex-col items-center justify-center gap-3">
                {props.focused ? (
                  <UsersRoundActiveIcon />
                ) : (
                  <UsersRound color="#B0B0B0" className="flex-1" />
                )}
                <EllipseActiveIcon style={{ opacity: props.focused ? 1 : 0 }} />
              </View>
            )
          },
        }}
      />
      <Tabs.Screen
        name="inicio"
        options={{
          title: 'Início',
          headerShown: false,
          tabBarIcon: (props) => {
            return (
              <View className="flex flex-col items-center justify-center gap-3">
                {props.focused ? <HouseActiveIcon /> : <House color="#B0B0B0" className="flex-1" />}
                <EllipseActiveIcon style={{ opacity: props.focused ? 1 : 0 }} />
              </View>
            )
          },
        }}
      />
      <Tabs.Screen
        name="empresa"
        options={{
          title: 'Empresas',
          headerShown: false,
          tabBarIcon: (props) => {
            return (
              <View className="flex flex-col items-center justify-center gap-3">
                {props.focused ? <StoreActiveIcon /> : <Store color="#B0B0B0" className="flex-1" />}
                <EllipseActiveIcon style={{ opacity: props.focused ? 1 : 0 }} />
              </View>
            )
          },
        }}
      />
    </Tabs>
  )
}

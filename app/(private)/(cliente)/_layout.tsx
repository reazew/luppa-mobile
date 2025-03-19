import {
  BellActiveIcon,
  EllipseActiveIcon,
  HouseActiveIcon,
  SearchActiveIcon,
  UserActiveIcon,
  WalletActiveIcon,
} from 'assets/icons'
import Constants from 'expo-constants'
import { Tabs } from 'expo-router'
import { Bell, House, Search, User, Wallet } from 'lucide-react-native'
import { Platform, View } from 'react-native'

const statusBarHeight = Constants.statusBarHeight

export default function ClientLayout() {
  return (
    <Tabs
      screenOptions={(props) => {
        return {
          headerShown: false,
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
        name="meu-status"
        options={{
          title: 'Meu Status',
          headerShown: false,
          tabBarIcon: (props) => {
            return (
              <View className="flex flex-col items-center justify-center gap-3">
                {props.focused ? <UserActiveIcon /> : <User color="#B0B0B0" className="flex-1" />}
                <EllipseActiveIcon style={{ opacity: props.focused ? 1 : 0 }} />
              </View>
            )
          },
        }}
      />
      <Tabs.Screen
        name="pagamento"
        options={{
          title: 'Pagamento',
          headerShown: false,
          tabBarIcon: (props) => {
            return (
              <View className="flex flex-col items-center justify-center gap-3">
                {props.focused ? <WalletActiveIcon /> : <Wallet color="#B0B0B0" className="pb-8" />}
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
        name="empresas"
        options={{
          title: 'Empresas',
          headerShown: false,
          tabBarIcon: (props) => {
            return (
              <View className="flex flex-col items-center justify-center gap-3">
                {props.focused ? (
                  <SearchActiveIcon />
                ) : (
                  <Search color="#B0B0B0" className="flex-1" />
                )}
                <EllipseActiveIcon style={{ opacity: props.focused ? 1 : 0 }} />
              </View>
            )
          },
        }}
      />
      <Tabs.Screen
        name="notificacoes"
        options={{
          title: 'Notificações',
          headerShown: false,
          tabBarIcon: (props) => {
            return (
              <View className="flex flex-col items-center justify-center gap-3">
                {props.focused ? <BellActiveIcon /> : <Bell color="#B0B0B0" className="flex-1" />}
                <EllipseActiveIcon style={{ opacity: props.focused ? 1 : 0 }} />
              </View>
            )
          },
        }}
      />
    </Tabs>
  )
}

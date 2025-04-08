import {
  EllipseActiveIcon,
  HouseActiveIcon,
  MegaphoneActiveIcon,
  StoreActiveIcon,
  UsersRoundActiveIcon,
  WalletActiveIcon,
} from 'assets/icons'
import Constants from 'expo-constants'
import { Tabs } from 'expo-router'
import {
  House,
  Megaphone,
  Store,
  UsersRound,
  Wallet,
} from 'lucide-react-native'
import { Platform, View } from 'react-native'

const statusBarHeight = Constants.statusBarHeight

export default function BusinessLayout() {
  return (
    <Tabs
      screenOptions={(props) => {
        return {
          headerShown: false,
          headerShadowVisible: false,
          tabBarShowLabel: false,
          tabBarInactiveTintColor: '#B0B0B0',
          tabBarStyle: {
            backgroundColor: '#1F1F1F',
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
        name="campanhas"
        options={{
          title: 'Campanhas',
          headerShown: false,
          tabBarIcon: (props) => {
            return (
              <View className="flex flex-col items-center justify-center gap-3">
                {props.focused ? (
                  <MegaphoneActiveIcon />
                ) : (
                  <Megaphone color={props.color} className="flex-1" />
                )}
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
                {props.focused ? (
                  <WalletActiveIcon />
                ) : (
                  <Wallet color={props.color} className="flex-1" />
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
                {props.focused ? (
                  <HouseActiveIcon />
                ) : (
                  <House color={props.color} className="flex-1" />
                )}
                <EllipseActiveIcon style={{ opacity: props.focused ? 1 : 0 }} />
              </View>
            )
          },
        }}
      />
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
                  <UsersRound color={props.color} className="flex-1" />
                )}
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
                {props.focused ? (
                  <StoreActiveIcon />
                ) : (
                  <Store color={props.color} className="flex-1" />
                )}
                <EllipseActiveIcon style={{ opacity: props.focused ? 1 : 0 }} />
              </View>
            )
          },
        }}
      />
    </Tabs>
  )
}

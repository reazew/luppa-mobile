import { Bell, ChevronDown, MapPin, Menu } from 'lucide-react-native'
import type { ViewProps } from 'react-native'
import { Pressable, Text, View } from 'react-native'

export const NavbarClient = ({ style }: ViewProps) => {
  return (
    <View
      style={style}
      className="flex w-full flex-row items-center justify-between bg-white">
      <Pressable className="flex size-12 items-center justify-center rounded-full bg-slate-100">
        <Menu size={24} color="black" />
      </Pressable>
      <View className="flex flex-row items-center justify-center gap-2">
        <View className="flex flex-col items-center justify-center gap-1">
          <Text className="text-center text-sm text-slate-800">
            Localização
          </Text>
          <View className="flex flex-row items-center gap-1">
            <MapPin size={16} color="#FF0000" />
            <Text className="text-lg font-bold">Caratinga - MG</Text>
          </View>
        </View>
        <ChevronDown size={14} color="black" />
      </View>
      <Pressable className="relative flex size-12 items-center justify-center rounded-full bg-slate-100">
        <Bell size={24} color="black" />
        <View className="absolute right-[-2px] top-[-2px] h-3 w-3 rounded-full bg-[#FF0000]" />
      </Pressable>
    </View>
  )
}

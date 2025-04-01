import { MessageCircleWarning } from 'lucide-react-native'
import { cssInterop } from 'nativewind'
import { View } from 'react-native'

cssInterop(MessageCircleWarning, {
  className: 'style',
})

export const MessageBubble = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="flex-row gap-4 rounded-3xl bg-black-700 p-6">
      <View className="items-start justify-start">
        <MessageCircleWarning size={24} className="text-yellow-300" />
      </View>
      <View className="flex-1 items-center justify-center">{children}</View>
    </View>
  )
}

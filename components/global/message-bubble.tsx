import { Text } from 'components/global/text'
import { MessageCircleWarning, X } from 'lucide-react-native'
import { cssInterop } from 'nativewind'
import { useState } from 'react'
import { Pressable, View } from 'react-native'

cssInterop(MessageCircleWarning, {
  className: 'style',
})

cssInterop(X, {
  className: 'style',
})

export const MessageBubble = ({
  children,
  onClose,
}: {
  children: React.ReactNode
  onClose?: () => void
}) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  return (
    <View
      className={`flex-col gap-4 rounded-3xl bg-black-600 p-6 ${!isVisible ? 'hidden' : ''}`}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center justify-start gap-2">
          <MessageCircleWarning size={24} className="text-yellow-300" />
          <Text size="md" weight="bold">
            Dica da lupa
          </Text>
        </View>
        <Pressable onPress={handleClose}>
          <X size={24} className="text-black-0" />
        </Pressable>
      </View>
      <View className="items-center justify-center">{children}</View>
    </View>
  )
}

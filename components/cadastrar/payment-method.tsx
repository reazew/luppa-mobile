import { Text } from 'components/global/text'
import { cn } from 'lib/util'
import { CircleCheckBig } from 'lucide-react-native'
import type { ViewProps } from 'react-native'
import { Pressable, View } from 'react-native'

interface PaymentMethodItemProps extends ViewProps {
  className?: string
  label: string
  description: string
  icon: React.ReactNode
  isRegistered?: boolean
  onPress?: () => void
}

export const PaymentMethod = ({
  className,
  icon,
  label,
  description,
  isRegistered = false,
  onPress,
  ...props
}: PaymentMethodItemProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={() => ({
        flex: 1,
        flexGrow: 1,
        minWidth: 364,
        maxHeight: 133,
        height: '100%',
        width: '100%',
      })}
      className={cn(className)}
      {...props}>
      {({ pressed }) => (
        <View
          style={{
            flex: 1,
            borderRadius: 32,
            height: '100%',
            width: '100%',
          }}
          className={cn(
            'flex-row items-center justify-between rounded-4xl bg-black-600 p-[24px]',
            pressed && 'bg-black-500'
          )}>
          <View className="flex-row items-center gap-4">
            {icon}
            <View className="flex-1 gap-4">
              <Text
                size="huge-2"
                weight="bold"
                className="text-left text-black-0">
                {label}
              </Text>
              <Text
                size="lg"
                weight="regular"
                className="text-left text-black-0">
                {description}
              </Text>
            </View>
            {isRegistered && (
              <CircleCheckBig size={24} color="#00FF6E" className="w-[24px]" />
            )}
          </View>
        </View>
      )}
    </Pressable>
  )
}

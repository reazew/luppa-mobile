import { Text } from 'components/global/text'
import { LinearGradient } from 'expo-linear-gradient'
import { cn } from 'lib/util'
import type { ViewProps } from 'react-native'
import { Pressable, View } from 'react-native'

interface PaymentMethodItemProps extends ViewProps {
  className?: string
  label: string
  description: string
  icon: React.ReactNode
}

export const PaymentMethod = ({ className, icon, label, description, ...props }: PaymentMethodItemProps) => {
  return (
    <Pressable
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
        <LinearGradient
          colors={pressed ? ['#FFB901', '#FC1A70'] : ['#BFBFBF', '#BFBFBF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flex: 1,
            borderRadius: 32,
            padding: 1,
            height: '100%',
            width: '100%',
          }}>
          <View
            style={{ flex: 1 }}
            className="flex-row items-center justify-center gap-4 rounded-4xl bg-background p-[24px]">
            {icon}
            <View className="max-w-[236px] gap-4">
              <Text size="huge-2" weight="bold" className={cn('text-left text-black-50', pressed && 'text-black-0')}>
                {label}
              </Text>
              <Text size="lg" weight="regular" className={cn('text-left text-black-50', pressed && 'text-black-0')}>
                {description}
              </Text>
            </View>
          </View>
        </LinearGradient>
      )}
    </Pressable>
  )
}

import { Text } from 'components/global/text'
import { cn } from 'lib/util'
import { cssInterop } from 'nativewind'
import { View } from 'react-native'

cssInterop(View, {
  className: 'style',
})

interface HeadingProps {
  children: React.ReactNode
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  size?: 'huge-3' | 'huge-2' | 'huge' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  weight?: 'bold' | 'regular'
  className?: string
}

export const Heading = ({
  children,
  icon,
  iconPosition = 'left',
  size = 'huge-2',
  weight = 'bold',
  className,
}: HeadingProps) => {
  return (
    <View
      className={cn(
        'w-full flex-row items-center justify-start gap-2',
        className
      )}>
      <View>{iconPosition === 'left' && icon}</View>

      <Text
        size={size}
        weight={weight}
        className={cn(icon && 'flex-initial', 'text-left')}>
        {children}
      </Text>

      <View>{iconPosition === 'right' && icon}</View>
    </View>
  )
}

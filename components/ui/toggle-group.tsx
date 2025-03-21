import { ClientActiveIcon, ClientIcon, ShopActiveIcon, ShopIcon } from 'assets/images/svg'
import { cva, type VariantProps } from 'class-variance-authority'
import { Text } from 'components/global/text'
import { LinearGradient } from 'expo-linear-gradient'
import { cn } from 'lib/util'
import * as React from 'react'
import { Pressable, View, type ViewProps } from 'react-native'

const toggleVariants = cva(
  'flex-1 w-full inline-flex items-center justify-center rounded-4xl text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-black-100 bg-transparent hover:bg-black-700/50',
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-2.5',
        lg: 'h-11 px-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ToggleGroupContextValue extends VariantProps<typeof toggleVariants> {
  value?: string
  onValueChange?: (value: string) => void
  type: 'single' | 'multiple'
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  type: 'single',
})

interface ToggleGroupProps extends ViewProps, VariantProps<typeof toggleVariants> {
  type: 'single' | 'multiple'
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

const ToggleGroup = React.forwardRef<View, ToggleGroupProps>(
  ({ className, variant, size, children, type, value, onValueChange, ...props }, ref) => (
    <ToggleGroupContext.Provider value={{ variant, size, type, value, onValueChange }}>
      <View ref={ref} className={cn('flex-1 flex-grow gap-8', className)} {...props}>
        {children}
      </View>
    </ToggleGroupContext.Provider>
  )
)

interface ToggleGroupItemProps extends ViewProps {
  value: string
  className?: string
  label: string
  description: string
  variant?: 'client' | 'company'
}
const ToggleGroupItem = React.forwardRef<View, ToggleGroupItemProps>(
  ({ className, variant = 'client', children, value, label, description, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext)
    const isSelected = context.value === value

    const getIcon = () => {
      if (variant === 'client') {
        return isSelected ? (
          <ClientActiveIcon width={64} height={64} />
        ) : (
          <ClientIcon width={64} height={64} />
        )
      }
      return isSelected ? (
        <ShopActiveIcon width={64} height={64} />
      ) : (
        <ShopIcon width={64} height={64} />
      )
    }

    return (
      <Pressable
        onPress={() => context.onValueChange?.(value)}
        style={{ overflow: 'hidden' }}
        className={cn(
          toggleVariants({
            variant: context.variant,
            size: context.size,
          }),
          isSelected && '',
          className
        )}
        {...props}>
        <LinearGradient
          colors={isSelected ? ['#FFB901', '#FC1A70'] : ['#BFBFBF', '#BFBFBF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, borderRadius: 32, padding: 1, width: '100%', height: '100%' }}>
          <View
            ref={ref}
            style={{ flex: 1, width: '100%' }}
            className="items-center justify-center gap-4 rounded-4xl bg-background p-6">
            {getIcon()}
            <Text
              size="huge-2"
              weight="bold"
              className={cn('text-black-50', isSelected && 'text-black-0')}>
              {label}
            </Text>
            <Text
              size="lg"
              weight="regular"
              className={cn('text-center text-black-50', isSelected && 'text-black-0')}>
              {description}
            </Text>
          </View>
        </LinearGradient>
      </Pressable>
    )
  }
)

ToggleGroup.displayName = 'ToggleGroup'
ToggleGroupItem.displayName = 'ToggleGroupItem'

export { ToggleGroup, ToggleGroupItem, type ToggleGroupItemProps, type ToggleGroupProps }

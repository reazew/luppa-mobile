import {
  ClientActiveIcon,
  ClientIcon,
  CreditCardActiveIcon,
  CreditCardIcon,
  DebitCardActiveIcon,
  DebitCardIcon,
  PixActiveIcon,
  PixIcon,
  ShopActiveIcon,
  ShopIcon,
} from 'assets/images/svg'
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
  variant?: 'client' | 'company' | 'pix' | 'credit-card' | 'debit-card'
}
const ToggleGroupItem = React.forwardRef<View, ToggleGroupItemProps>(
  ({ className, variant = 'client', children, value, label, description, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext)
    const isSelected = context.value === value

    const getIcon = () => {
      switch (variant) {
        case 'client':
          return isSelected ? (
            <ClientActiveIcon width={64} height={64} />
          ) : (
            <ClientIcon width={64} height={64} />
          )
        case 'company':
          return isSelected ? (
            <ShopActiveIcon width={64} height={64} />
          ) : (
            <ShopIcon width={64} height={64} />
          )
        case 'pix':
          return isSelected ? (
            <PixActiveIcon width={64} height={64} />
          ) : (
            <PixIcon width={64} height={64} />
          )
        case 'credit-card':
          return isSelected ? (
            <CreditCardActiveIcon width={64} height={64} />
          ) : (
            <CreditCardIcon width={64} height={64} />
          )
        case 'debit-card':
          return isSelected ? (
            <DebitCardActiveIcon width={64} height={64} />
          ) : (
            <DebitCardIcon width={64} height={64} />
          )
        default:
          return null
      }
    }
    return (
      <Pressable
        onPress={() => context.onValueChange?.(value)}
        style={{
          overflow: 'hidden',
          ...(variant === 'pix' || variant === 'credit-card' || variant === 'debit-card'
            ? { maxHeight: 133 }
            : {}),
        }}
        className={cn(
          toggleVariants({
            variant: context.variant,
            size: context.size,
          }),
          isSelected && '',
          className
        )}
        {...props}>
        {variant === 'client' || variant === 'company' ? (
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
              <View className="items-center justify-center gap-4">
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
            </View>
          </LinearGradient>
        ) : variant === 'pix' || variant === 'credit-card' || variant === 'debit-card' ? (
          <LinearGradient
            colors={isSelected ? ['#FFB901', '#FC1A70'] : ['#BFBFBF', '#BFBFBF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              flex: 1,
              borderRadius: 32,
              padding: 1,
              width: '100%',
              height: '100%',
            }}>
            <View
              ref={ref}
              style={{ flex: 1, width: '100%' }}
              className="flex-row items-center justify-center gap-4 rounded-4xl bg-background p-6">
              {getIcon()}
              <View className="max-w-[220px] gap-4">
                <Text
                  size="huge-2"
                  weight="bold"
                  className={cn('text-left text-black-50', isSelected && 'text-black-0')}>
                  {label}
                </Text>
                <Text
                  size="lg"
                  weight="regular"
                  className={cn('text-left text-black-50', isSelected && 'text-black-0')}>
                  {description}
                </Text>
              </View>
            </View>
          </LinearGradient>
        ) : null}
      </Pressable>
    )
  }
)

ToggleGroup.displayName = 'ToggleGroup'
ToggleGroupItem.displayName = 'ToggleGroupItem'

export { ToggleGroup, ToggleGroupItem, type ToggleGroupItemProps, type ToggleGroupProps }

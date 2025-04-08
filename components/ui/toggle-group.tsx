import {
  ClientActiveIcon,
  ClientIcon,
  CreditCardActiveIcon,
  CreditCardIcon,
  DebitCardActiveIcon,
  DebitCardIcon,
  PixActiveIcon,
  PixIcon,
  ShopActiveIconToggle,
  ShopIcon,
} from 'assets/icons'
import { cva, type VariantProps } from 'class-variance-authority'
import { Text } from 'components/global/text'
import { FormControl } from 'components/ui/form'
import { LinearGradient } from 'expo-linear-gradient'
import { cn } from 'lib/util'
import * as React from 'react'
import { Pressable, View, type ViewProps } from 'react-native'

const toggleVariants = cva(
  'flex-1 w-full items-center justify-center rounded-4xl text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-black-100 bg-transparent hover:bg-black-700/50',
      },
      size: {
        default: 'flex-1',
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
  displayVariant?: 'default' | 'row'
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  type: 'single',
})

interface ToggleGroupProps
  extends ViewProps,
    VariantProps<typeof toggleVariants> {
  type: 'single' | 'multiple'
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  displayVariant?: 'default' | 'row'
}

const ToggleGroup = React.forwardRef<View, ToggleGroupProps>(
  (
    {
      className,
      variant,
      size,
      children,
      type,
      value,
      onValueChange,
      displayVariant = 'default',
      ...props
    },
    ref
  ) => (
    <FormControl>
      <ToggleGroupContext.Provider
        value={{ variant, size, type, value, onValueChange, displayVariant }}>
        <View
          ref={ref}
          className={cn('flex-1 flex-grow gap-[32px]', className)}
          {...props}>
          {children}
        </View>
      </ToggleGroupContext.Provider>
    </FormControl>
  )
)

interface ToggleGroupItemProps extends ViewProps {
  value: string
  className?: string
  label: string
  description: string
  icon?: 'client' | 'business' | 'pix' | 'credit-card' | 'debit-card'
}

const ToggleGroupItem = React.forwardRef<View, ToggleGroupItemProps>(
  (
    { className, icon = '', children, value, label, description, ...props },
    ref
  ) => {
    const context = React.useContext(ToggleGroupContext)
    const isSelected = context.value === value
    const variant = context.displayVariant || 'default'

    const getIcon = () => {
      switch (icon) {
        case 'client':
          return isSelected ? (
            <ClientActiveIcon width={88} height={88} />
          ) : (
            <ClientIcon width={88} height={88} />
          )
        case 'business':
          return isSelected ? (
            <ShopActiveIconToggle width={88} height={88} />
          ) : (
            <ShopIcon width={88} height={88} />
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
          flex: 1,
          flexGrow: 1,
          height: '100%',
          width: '100%',
          ...(variant === 'row' ? { maxHeight: 133 } : {}),
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
        {variant === 'default' ? (
          <View
            ref={ref}
            style={{
              flex: 1,
              borderRadius: 32,
              minWidth: 364,
              minHeight: 250,
              height: '100%',
              width: '100%',
            }}
            className={cn(
              'items-center justify-center gap-4 rounded-4xl bg-black-600 p-6 transition-all duration-300 ease-out',
              isSelected && 'bg-yellow-300'
            )}>
            {getIcon()}
            <View className="items-center justify-center gap-4">
              <Text
                size="huge-2"
                weight="bold"
                className={cn('text-black-50', isSelected && 'text-black-700')}>
                {label}
              </Text>
              <Text
                size="lg"
                weight="regular"
                className={cn(
                  'text-center text-black-50',
                  isSelected && 'text-black-700'
                )}>
                {description}
              </Text>
            </View>
          </View>
        ) : variant === 'row' ? (
          <LinearGradient
            colors={
              isSelected ? ['#FFB901', '#FC1A70'] : ['#BFBFBF', '#BFBFBF']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              flex: 1,
              borderRadius: 32,
              padding: 1,
              minWidth: 364,
              minHeight: 133,
              height: '100%',
              width: '100%',
            }}>
            <View
              ref={ref}
              style={{ flex: 1 }}
              className="flex-row items-center justify-center gap-4 rounded-4xl bg-background p-6">
              {getIcon()}
              <View className="max-w-[236px] gap-4">
                <Text
                  size="huge-2"
                  weight="bold"
                  className={cn(
                    'text-left text-black-50',
                    isSelected && 'text-black-0'
                  )}>
                  {label}
                </Text>
                <Text
                  size="lg"
                  weight="regular"
                  className={cn(
                    'text-left text-black-50',
                    isSelected && 'text-black-0'
                  )}>
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

export {
  ToggleGroup,
  ToggleGroupItem,
  type ToggleGroupItemProps,
  type ToggleGroupProps,
}

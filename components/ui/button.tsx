import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'lib/util'
import type { LegacyRef } from 'react'
import * as React from 'react'
import {
  ActivityIndicator,
  Pressable,
  Text as RNText,
  View,
  type PressableProps,
} from 'react-native'

const buttonConfig = {
  variants: {
    default: {
      button: 'bg-yellow-300 active:bg-yellow-100 disabled:bg-black-700',
      text: {
        enabled: 'text-black-900 group-active:text-black-900',
        disabled: 'text-black-500',
      },
      icon: {
        base: '#000000',
        pressed: '#000000',
        disabled: '#737373',
      },
    },
    outline: {
      button:
        'bg-transparent border border-black-0 active:border-black-50 disabled:border-black-100',
      text: {
        enabled: 'text-black-0 group-active:text-black-50',
        disabled: 'text-black-100',
      },
      icon: {
        base: '#FFFFFF',
        pressed: '#BFBFBF',
        disabled: '#737373',
      },
    },
    ghost: {
      button: 'bg-transparent',
      text: {
        enabled: 'text-black-0 group-active:text-black-50',
        disabled: 'text-black-100',
      },
      icon: {
        base: '#FFFFFF',
        pressed: '#BFBFBF',
        disabled: '#737373',
      },
    },
    destructive: {
      button: 'bg-red-300 active:bg-red-500 disabled:bg-black-700',
      text: {
        enabled: 'text-black-0 group-active:text-black-0',
        disabled: 'text-black-100',
      },
      icon: {
        base: '#FFFFFF',
        pressed: '#FFFFFF',
        disabled: '#737373',
      },
    },
    destructiveGhost: {
      button: 'active:text-red-500',
      text: {
        enabled: 'text-red-300 group-active:text-red-500',
        disabled: 'text-black-100',
      },
      icon: {
        base: '#FF3930',
        pressed: '#9C231D',
        disabled: '#737373',
      },
    },
    destructiveOutline: {
      button: 'border border-red-300 active:border-red-500 disabled:border-black-100',
      text: {
        enabled: 'text-red-300 group-active:text-red-500',
        disabled: 'text-black-100',
      },
      icon: {
        base: '#FF3930',
        pressed: '#9C231D',
        disabled: '#737373',
      },
    },
  },
  sizes: {
    default: 'h-10 px-4 py-2.5',
    icon: 'h-10 w-10 rounded-full',
    sm: 'h-8 px-3 py-2',
    lg: 'h-12 px-6 py-3',
  },
}

const buttonVariants = cva(
  'group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-5xl text-sm font-semibold ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: Object.fromEntries(
        Object.entries(buttonConfig.variants).map(([key, value]) => [key, value.button])
      ),
      size: buttonConfig.sizes,
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const textVariants = Object.fromEntries(
  Object.entries(buttonConfig.variants).map(([key, value]) => [key, value.text])
)

const iconColors = Object.fromEntries(
  Object.entries(buttonConfig.variants).map(([key, value]) => [key, value.icon])
)

interface ButtonRootProps extends VariantProps<typeof buttonVariants> {
  onPress?: () => void
  disabled?: boolean
  isLoading?: boolean
  loadingIndicatorColor?: string
  className?: string
  children?: React.ReactNode
}

interface ButtonIconProps {
  children: React.ReactElement
}

interface ButtonTextProps {
  children: React.ReactNode
}

const ButtonRoot = React.forwardRef<PressableProps, ButtonRootProps>(
  (
    {
      variant = 'default',
      size = 'default',
      onPress,
      disabled = false,
      isLoading = false,
      loadingIndicatorColor = '#171717',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const getIconColor = (pressed: boolean) => {
      const colors = iconColors[variant as keyof typeof iconColors]
      if (disabled) return colors.disabled
      if (pressed) return colors.pressed
      return colors.base
    }

    const renderChild = (child: React.ReactNode, pressed: boolean) => {
      if (!React.isValidElement(child)) return child

      if (child.type === ButtonIcon) {
        return React.cloneElement(child.props.children, {
          size: 16,
          color: getIconColor(pressed),
        })
      }

      if (child.type === ButtonText) {
        const textStyle =
          textVariants[variant as keyof typeof textVariants][disabled ? 'disabled' : 'enabled']
        return <RNText className={cn(textStyle)}>{child.props.children}</RNText>
      }

      return child
    }

    return (
      <Pressable
        ref={ref as LegacyRef<View>}
        onPress={onPress}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size }), className)}
        style={({ pressed }) => (pressed ? { opacity: 1 } : {})}
        {...props}>
        {({ pressed }) =>
          isLoading ? (
            <ActivityIndicator color={loadingIndicatorColor} />
          ) : (
            <View className="flex-row items-center justify-center gap-2">
              {React.Children.map(children, (child) => renderChild(child, pressed))}
            </View>
          )
        }
      </Pressable>
    )
  }
)

const ButtonIcon: React.FC<ButtonIconProps> = () => null
const ButtonText: React.FC<ButtonTextProps> = () => null

const Button = Object.assign(ButtonRoot, {
  Icon: ButtonIcon,
  Text: ButtonText,
})

export { Button, buttonVariants }

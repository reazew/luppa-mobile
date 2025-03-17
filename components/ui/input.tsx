import { cn } from 'lib/util'
import type { LucideIcon } from 'lucide-react-native'
import * as React from 'react'
import { TextInput, TextInputProps, View } from 'react-native'

export interface InputProps extends Omit<TextInputProps, 'className'> {
  icon?: LucideIcon
  iconSide?: 'left' | 'right'
  className?: string
  error?: boolean
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ icon: Icon, iconSide = 'left', placeholder = '', className, error, ...props }, ref) => {
    return (
      <View className={cn('relative', className)}>
        {Icon && iconSide === 'left' && (
          <View className="absolute left-3 top-2.5 z-10">
            <Icon
              size={20}
              className={cn(
                'text-gray-900',
                error ? 'text-red-500' : '',
                props.editable === false ? 'text-gray-400' : ''
              )}
            />
          </View>
        )}

        <TextInput
          ref={ref}
          placeholder={placeholder}
          className={cn(
            'h-10 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-900',
            'placeholder:text-gray-400',
            'focus:border-blue-500',
            Icon && iconSide === 'left' && 'pl-10',
            Icon && iconSide === 'right' && 'pr-10',
            error && 'border-red-500',
            props.editable === false && 'border-gray-200 bg-gray-100 text-gray-400',
            className
          )}
          placeholderTextColor="#9CA3AF"
          {...props}
        />

        {Icon && iconSide === 'right' && (
          <View className="absolute right-3 top-2.5 z-10">
            <Icon
              size={20}
              className={cn(
                'text-gray-900',
                error ? 'text-red-500' : '',
                props.editable === false ? 'text-gray-400' : ''
              )}
            />
          </View>
        )}
      </View>
    )
  }
)

Input.displayName = 'Input'

export { Input }

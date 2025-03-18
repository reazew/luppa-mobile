import { cn } from 'lib/util'
import type { LucideIcon } from 'lucide-react-native'
import * as React from 'react'
import { TextInput, TextInputProps, View } from 'react-native'

export interface InputProps extends Omit<TextInputProps, 'className'> {
  icon?: LucideIcon
  iconSide?: 'left' | 'right'
  className?: string
  error?: boolean
  value?: string
  onChangeText?: (text: string) => void
}

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      icon: Icon,
      iconSide = 'left',
      placeholder = '',
      className,
      error,
      value,
      onChangeText,
      ...props
    },
    ref
  ) => {
    return (
      <View className={cn('relative min-w-[152px] rounded-5xl', className)}>
        {Icon && iconSide === 'left' && (
          <View className="absolute left-3 top-2.5 z-10">
            <Icon size={16} color={props.editable === false ? '#666666' : '#757575'} />
          </View>
        )}
        <TextInput
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          className={cn(
            'h-10 w-full min-w-[152px] rounded-5xl border border-transparent bg-black-700 px-4 pb-1.5 text-base text-black-0 focus:bg-black-600 disabled:bg-black-500',
            'placeholder:text-black-100',
            'focus:border-yellow-300',
            Icon && iconSide === 'left' && 'pl-10',
            Icon && iconSide === 'right' && 'pr-10',
            error && 'border-red-300',
            props.editable === false && 'bg-black-500 placeholder:text-black-200'
          )}
          {...props}
        />
        {Icon && iconSide === 'right' && (
          <View className="absolute right-3 top-2.5 z-10">
            <Icon size={20} color={props.editable === false ? '#666666' : '#757575'} />
          </View>
        )}
      </View>
    )
  }
)

Input.displayName = 'Input'

export { Input }

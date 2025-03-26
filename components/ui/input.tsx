import { FormControl } from 'components/ui/form'
import { cn } from 'lib/util'
import type { LucideIcon } from 'lucide-react-native'
import * as React from 'react'
import { Platform, TextInput, TextInputProps, View } from 'react-native'

interface BaseInputProps extends Omit<TextInputProps, 'className'> {
  icon?: LucideIcon
  iconSide?: 'left' | 'right'
  className?: string
  error?: boolean
  value?: string
}

export interface InputProps extends BaseInputProps {
  onChangeText?: (text: string) => void
  onSubmitEditing?: () => void
}

const IconWrapper = ({ Icon, side, editable }: { Icon: LucideIcon; side: 'left' | 'right'; editable?: boolean }) => (
  <View className={`absolute ${side === 'left' ? 'left-3' : 'right-3'} top-2.5 z-10`}>
    <Icon size={side === 'right' ? 20 : 16} color={editable === false ? '#666666' : '#757575'} />
  </View>
)

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
      onSubmitEditing,
      ...props
    },
    ref
  ) => {
    return (
      <FormControl className={cn('relative min-w-[152px] rounded-5xl', className)}>
        {Icon && iconSide === 'left' && <IconWrapper Icon={Icon} side="left" editable={props.editable} />}
        <TextInput
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          className={cn(
            Platform.OS === 'ios' && 'pb-1.5 leading-none',
            'h-[40px] w-full min-w-[152px] rounded-5xl border border-transparent bg-black-700 px-4 text-base text-black-0 focus:bg-black-600 disabled:bg-black-500',
            'placeholder:text-black-100',
            'focus:border-yellow-300',
            Icon && iconSide === 'left' && 'pl-10',
            Icon && iconSide === 'right' && 'pr-10',
            error && 'border-red-300',
            props.editable === false && 'bg-black-500 placeholder:text-black-200'
          )}
          {...props}
        />
        {Icon && iconSide === 'right' && <IconWrapper Icon={Icon} side="right" editable={props.editable} />}
      </FormControl>
    )
  }
)

Input.displayName = 'Input'

export { Input }

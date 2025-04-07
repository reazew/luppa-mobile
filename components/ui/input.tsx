import { FormControl } from 'components/ui/form'
import { cn } from 'lib/util'
import type { LucideIcon } from 'lucide-react-native'
import { cssInterop } from 'nativewind'
import * as React from 'react'
import { Platform, TextInput, TextInputProps, View } from 'react-native'

cssInterop(TextInput, {
  className: 'style',
})

interface BaseInputProps extends Omit<TextInputProps, 'className'> {
  icon?: LucideIcon
  iconSide?: 'left' | 'right'
  className?: string
  error?: boolean
  value?: string
  multiline?: boolean
  numberOfLines?: number
}

export interface InputProps extends BaseInputProps {
  onChangeText?: (text: string) => void
  onSubmitEditing?: () => void
  keyboardType?:
    | 'default'
    | 'ascii-capable'
    | 'decimal-pad'
    | 'name-phone-pad'
    | 'number-pad'
    | 'numbers-and-punctuation'
    | 'numeric'
    | 'phone-pad'
    | 'email-address'
    | 'visible-password'
    | 'twitter'
    | 'url'
    | 'web-search'
}

const IconWrapper = ({
  Icon,
  side,
  editable,
  hasValue,
}: {
  Icon: LucideIcon
  side: 'left' | 'right'
  editable?: boolean
  hasValue?: boolean
}) => (
  <View
    className={`absolute ${side === 'left' ? 'left-4' : 'right-2'} top-1/2 z-10 -translate-y-1/2`}>
    <Icon
      size={side === 'right' ? 20 : 16}
      color={hasValue ? '#FFFFFF' : editable === false ? '#666666' : '#757575'}
    />
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
      keyboardType,
      multiline = false,
      numberOfLines = 4,
      ...props
    },
    ref
  ) => {
    return (
      <FormControl
        className={cn('relative min-w-[152px] rounded-5xl', className)}>
        {Icon && iconSide === 'left' && (
          <IconWrapper
            Icon={Icon}
            side="left"
            editable={props.editable}
            hasValue={!!value}
          />
        )}
        <TextInput
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          multiline={multiline}
          keyboardType={keyboardType}
          numberOfLines={multiline ? numberOfLines : 1}
          textAlignVertical={multiline ? 'top' : 'center'}
          className={cn(
            Platform.OS === 'ios' && 'pb-[3px] leading-none',
            'min-w-[152px] border border-transparent px-4 text-base text-black-0',
            value ? 'bg-black-600' : 'bg-black-600',
            'focus:bg-black-500',
            'disabled:bg-black-500',
            multiline
              ? 'min-h-[120px] rounded-[16px] py-3'
              : 'h-[40px] w-full flex-1 overflow-hidden text-nowrap rounded-5xl',
            'placeholder:text-black-100',
            'focus:border-yellow-300',
            Icon && iconSide === 'left' && 'pl-10',
            Icon && iconSide === 'right' && 'pr-10',
            error && 'border-red-300',
            props.editable === false &&
              'bg-black-500 placeholder:text-black-200'
          )}
          {...props}
        />
        {Icon && iconSide === 'right' && (
          <IconWrapper
            Icon={Icon}
            side="right"
            editable={props.editable}
            hasValue={!!value}
          />
        )}
      </FormControl>
    )
  }
)

Input.displayName = 'Input'

export { Input }

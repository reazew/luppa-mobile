import { FormControl } from 'components/ui/form'
import { cn } from 'lib/util'
import type { LucideIcon } from 'lucide-react-native'
import { cssInterop } from 'nativewind'
import * as React from 'react'
import { Platform, TextInput, View, type TextInputProps } from 'react-native'
import { MaskedTextInput } from 'react-native-mask-text'

cssInterop(MaskedTextInput, {
  className: 'style',
})

interface BaseInputProps extends Omit<TextInputProps, 'className'> {
  icon?: LucideIcon
  iconSide?: 'left' | 'right'
  className?: string
  error?: boolean
  value?: string
}

export interface MaskedInputProps extends BaseInputProps {
  onChangeText?: (text: string, rawText?: string) => void
  onSubmitEditing?: () => void
  mask: string
  type?: 'date' | 'time' | 'currency'
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
  options?: {
    format?: string
  } & Record<string, any>
}

const IconWrapper = ({
  Icon,
  side,
  editable,
}: {
  Icon: LucideIcon
  side: 'left' | 'right'
  editable?: boolean
}) => (
  <View
    className={`absolute ${side === 'left' ? 'left-3' : 'right-3'} top-2.5 z-10`}>
    <Icon
      size={side === 'right' ? 20 : 16}
      color={editable === false ? '#666666' : '#757575'}
    />
  </View>
)

const MaskedInput = React.forwardRef<TextInput, MaskedInputProps>(
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
      mask,
      type = 'text',
      options,
      keyboardType = 'default',
      ...props
    },
    ref
  ) => {
    return (
      <FormControl
        className={cn('relative min-w-[152px] rounded-5xl', className)}>
        {Icon && iconSide === 'left' && (
          <IconWrapper Icon={Icon} side="left" editable={props.editable} />
        )}
        <MaskedTextInput
          ref={ref}
          onSubmitEditing={onSubmitEditing}
          placeholder={placeholder}
          value={value}
          onChangeText={(text: string) => onChangeText?.(text)}
          className={cn(
            Platform.OS === 'ios' && 'pb-1.5 leading-none',
            'h-[40px] w-full min-w-[152px] rounded-5xl border border-transparent px-4 text-base text-black-0',
            value ? 'bg-black-600' : 'bg-black-600',
            'focus:bg-black-500',
            'disabled:bg-black-500',
            'placeholder:text-black-100',
            'focus:border-yellow-300',
            Icon && iconSide === 'left' && 'pl-10',
            Icon && iconSide === 'right' && 'pr-10',
            error && 'border-red-300',
            props.editable === false &&
              'bg-black-500 placeholder:text-black-200'
          )}
          placeholderTextColor="#737373"
          type={type}
          mask={mask}
          options={options}
          keyboardType={keyboardType}
          {...props}
        />
        {Icon && iconSide === 'right' && (
          <IconWrapper Icon={Icon} side="right" editable={props.editable} />
        )}
      </FormControl>
    )
  }
)

MaskedInput.displayName = 'MaskedInput'
export { MaskedInput }

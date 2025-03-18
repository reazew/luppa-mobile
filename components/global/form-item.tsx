import {
  FormControl,
  FormLabel,
  FormMessage,
  FormItem as OriginalFormItem,
} from 'components/ui/form'
import { cn } from 'lib/util'
import { type LucideIcon } from 'lucide-react-native'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { View } from 'react-native'

import { Input } from '../ui/input'
import { Select, SelectOption } from '../ui/select'

type FormFieldType = 'input' | 'select' | 'file' | 'image'

interface FormItemProps<T extends FieldValues> {
  field: ControllerRenderProps<T>
  fieldType: FormFieldType
  label?: string
  placeholder?: string
  icon?: LucideIcon
  iconSide?: 'left' | 'right'
  selectEmptyMessage?: string
  selectHasSearch?: boolean
  hideSupportiveText?: boolean
  className?: string
  error?: boolean
  disabled?: boolean
  options?: SelectOption[]
  imagePreviewSize?: { width: number; height: number }
  maxFiles?: number
}

const RenderInput = <T extends FieldValues>({
  fieldType,
  field,
  options,
  icon,
  iconSide,
  placeholder,
  selectHasSearch,
  error,
  disabled,
  imagePreviewSize = { width: 80, height: 80 },
  maxFiles = 1,
}: FormItemProps<T>) => {
  switch (fieldType) {
    case 'input':
      return (
        <FormControl>
          <Input
            placeholder={placeholder}
            icon={icon}
            iconSide={iconSide}
            error={error}
            editable={!disabled}
            {...field}
          />
        </FormControl>
      )

    case 'select':
      return (
        <FormControl>
          <Select
            placeholder={placeholder}
            options={options || []}
            hasSearch={selectHasSearch}
            error={error}
            disabled={disabled}
            value={field.value}
            onValueChange={field.onChange}
          />
        </FormControl>
      )

    default:
      return null
  }
}

export const FormItem = <T extends FieldValues>(props: FormItemProps<T>) => {
  const { label, hideSupportiveText = false, className } = props

  return (
    <OriginalFormItem className={cn('mb-4 flex-1 gap-2', className)}>
      {label && <FormLabel className="leading-none">{label}</FormLabel>}
      <RenderInput {...props} />
      {!hideSupportiveText && (
        <View className="mt-0 h-3">
          <FormMessage />
        </View>
      )}
    </OriginalFormItem>
  )
}

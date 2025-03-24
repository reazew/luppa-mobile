import { SelectField, type Option } from 'components/global/select-field'
import { FormLabel, FormMessage, FormItem as OriginalFormItem } from 'components/ui/form'
import { cn } from 'lib/util'
import { type LucideIcon } from 'lucide-react-native'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { View } from 'react-native'

import { Input } from '../ui/input'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

type FormFieldType = 'input' | 'select' | 'file' | 'image' | 'toggle-group'

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
  options?: Option[]
  imagePreviewSize?: { width: number; height: number }
  maxFiles?: number
  toggleType?: 'single' | 'multiple'
  displayVariant?: 'default' | 'row'
  toggleOptions?: {
    label: string
    value: string
    description: string
    icon?: 'client' | 'company' | 'pix' | 'credit-card' | 'debit-card'
  }[]
  mask?: string
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
  toggleType = 'single',
  toggleOptions,
  displayVariant = 'default',
  mask,
}: FormItemProps<T>) => {
  switch (fieldType) {
    case 'input':
      return (
        <Input
          placeholder={placeholder}
          icon={icon}
          iconSide={iconSide}
          error={error}
          mask={mask}
          editable={!disabled}
          value={field.value}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
        />
      )

    case 'select':
      return <SelectField field={field} options={options} placeholder={placeholder} error={error} disabled={disabled} />

    case 'toggle-group':
      return (
        <ToggleGroup
          type={toggleType}
          value={field.value || ''}
          onValueChange={field.onChange}
          displayVariant={displayVariant}>
          {toggleOptions?.map((option) => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              label={option.label}
              description={option.description ?? ''}
              icon={option.icon}
            />
          ))}
        </ToggleGroup>
      )

    default:
      return null
  }
}

export const FormItem = <T extends FieldValues>(props: FormItemProps<T>) => {
  const { label, hideSupportiveText = false, className, fieldType } = props

  return (
    <OriginalFormItem className={cn('mb-4 w-full justify-start gap-2', className)}>
      {label && <FormLabel className="leading-none">{label}</FormLabel>}
      <RenderInput {...props} />
      {!hideSupportiveText && fieldType !== 'toggle-group' && (
        <View className="mt-0 h-4">
          <FormMessage />
        </View>
      )}
    </OriginalFormItem>
  )
}

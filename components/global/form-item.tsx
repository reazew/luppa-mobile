import type { LucideIcon } from 'lucide-react-native'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'

type FormFieldType = 'input' | 'select' | 'currency' | 'quantity'

interface FormItemProps<T extends FieldValues> {
  field: ControllerRenderProps<T>
  fieldType: FormFieldType
  label?: string
  placeholder?: string
  icon?: LucideIcon
  iconSide?: 'left' | 'right'
  multipleSelect?: boolean
  error?: string
}

const RenderInput = <T extends FieldValues>({
  fieldType,
  field,
  icon: Icon,
  iconSide = 'left',
  ...inputProps
}: FormItemProps<T>) => {
  switch (fieldType) {
    case 'input':
      return (
        <View className="relative">
          {Icon && iconSide === 'left' && (
            <View className="absolute left-3 top-2.5">
              <Icon size={20} className="text-gray-500" />
            </View>
          )}
          <TextInput
            {...inputProps}
            value={field.value}
            onChangeText={field.onChange}
            className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base
              ${Icon && iconSide === 'left' ? 'pl-10' : ''}
              ${Icon && iconSide === 'right' ? 'pr-10' : ''}
              ${inputProps.error ? 'border-red-500' : 'focus:border-blue-500'}
            `}
          />
          {Icon && iconSide === 'right' && (
            <View className="absolute right-3 top-2.5">
              <Icon size={20} className="text-gray-500" />
            </View>
          )}
        </View>
      )
    default:
      return null
  }
}

export const FormItem = <T extends FieldValues>(props: FormItemProps<T>) => {
  const { label, error, fieldType } = props

  return (
    <View className="mb-4">
      {label && <Text className="mb-2 text-sm font-semibold text-gray-700">{label}</Text>}
      <RenderInput {...props} />
      {error && <Text className="mt-1 text-xs text-red-500">{error}</Text>}
    </View>
  )
}

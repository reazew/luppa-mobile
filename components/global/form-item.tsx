import {
  FormControl,
  FormLabel,
  FormMessage,
  FormItem as OriginalFormItem,
} from 'components/ui/form'
import { cn } from 'lib/util'
import { Icon, type LucideIcon } from 'lucide-react-native'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { View } from 'react-native'

import { FileInput, FileUploader, FileUploaderContent, FileUploaderItem } from '../ui/file-upload'
import { Input } from '../ui/input'
import { Select, SelectOption } from '../ui/select'

type FormFieldType = 'input' | 'select' | 'file'

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
            value={field.value}
            onChangeText={(text) => field.onChange(text)}
            onBlur={field.onBlur}
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

    case 'file':
      return (
        <FormControl>
          <FileUploader
            value={field.value}
            onValueChange={field.onChange}
            maxFiles={1}
            orientation="vertical">
            <FileUploaderContent>
              {field.value?.map((file: any, index: number) => (
                <FileUploaderItem key={index} index={index} fileName={file.name} />
              ))}
              <FileInput onSelect={(files) => field.onChange(files)} className="w-full">
                <View
                  className={cn(
                    'flex-row items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4',
                    error && 'border-red-300'
                  )}>
                  {icon && <Icon size={24} className="mr-2 text-gray-400" iconNode={[]} />}
                  <FormLabel>{placeholder || 'Click to upload file'}</FormLabel>
                </View>
              </FileInput>
            </FileUploaderContent>
          </FileUploader>
        </FormControl>
      )

    default:
      return null
  }
}

export const FormItem = <T extends FieldValues>(props: FormItemProps<T>) => {
  const { label, hideSupportiveText = false, className } = props

  return (
    <OriginalFormItem className={cn('mb-4', className)}>
      {label && <FormLabel>{label}</FormLabel>}
      <RenderInput {...props} />
      {!hideSupportiveText && <FormMessage />}
    </OriginalFormItem>
  )
}

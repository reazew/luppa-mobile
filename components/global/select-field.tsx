import { cn } from 'lib/util'
import { ChevronDown } from 'lucide-react-native'
import { useMemo, useState } from 'react'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'

import { FormControl } from '../ui/form'

export type Option = {
  value: string
  label: string
}

export interface SelectFieldProps<T extends FieldValues> {
  field: ControllerRenderProps<T>
  options?: Option[]
  placeholder?: string
  error?: boolean
  disabled?: boolean
}

export const SelectField = <T extends FieldValues>({
  field,
  options,
  placeholder,
  error,
  disabled,
}: SelectFieldProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = useMemo(
    () => options?.find((opt) => opt.value === field.value),
    [field.value, options]
  )

  return (
    <FormControl>
      <View className="relative w-full">
        <Pressable
          onPress={() => !disabled && setIsOpen((prev) => !prev)}
          className={cn(
            'h-10 w-full min-w-[152px] rounded-5xl border border-transparent bg-black-700 px-4 text-base text-black-0 focus:bg-black-600 disabled:bg-black-500',
            'placeholder:text-black-100',
            'focus:border-yellow-300',
            error && 'border-red-300',
            isOpen && 'border-yellow-300',
            disabled && 'bg-black-500 placeholder:text-black-200'
          )}>
          <View className="flex-1 flex-row items-center justify-between">
            <Text
              className={cn(
                'text-black-0',
                !selectedOption?.label && 'text-black-100'
              )}>
              {selectedOption?.label || placeholder || 'Selecione'}
            </Text>
            <ChevronDown
              size={20}
              color={disabled ? '#666666' : '#757575'}
              className={cn('transition-transform', isOpen && 'rotate-180')}
            />
          </View>
        </Pressable>

        {isOpen && (
          <View className="absolute top-full z-50 mt-1 w-full gap-2 rounded-lg border border-transparent bg-black-700 p-2">
            {options?.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => {
                  field.onChange(option.value)
                  setIsOpen(false)
                }}
                className={cn(
                  'rounded-lg p-2',
                  field.value === option.value
                    ? 'bg-black-600'
                    : 'hover:bg-black-600'
                )}>
                <Text className="text-black-0">{option.label}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </FormControl>
  )
}

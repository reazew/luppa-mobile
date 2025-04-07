import { cn } from 'lib/util'
import { ChevronDown, LoaderCircle } from 'lucide-react-native'
import { cssInterop } from 'nativewind'
import { useMemo, useState } from 'react'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { Pressable, ScrollView, Text, View } from 'react-native'

import { FormControl } from '../ui/form'

cssInterop(LoaderCircle, {
  className: 'style',
})

cssInterop(ChevronDown, {
  className: 'style',
})

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
  loading?: boolean
  onValueSelect?: () => void
}

export const SelectField = <T extends FieldValues>({
  field,
  options,
  placeholder,
  error,
  disabled,
  loading,
  onValueSelect,
}: SelectFieldProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)

  const selectedOption = useMemo(
    () => options?.find((opt) => opt.value === field.value),
    [field.value, options]
  )

  const dynamicPadding = useMemo(() => {
    if (!isOpen) return 0
    const itemHeight = 30
    const itemsCount = options?.length || 0
    const totalHeight = Math.min(itemHeight * itemsCount + 10, 150)
    return totalHeight
  }, [isOpen, options?.length])

  return (
    <FormControl>
      <View
        style={{ paddingBottom: dynamicPadding }}
        className={cn(
          'relative z-50 w-full transition-all duration-300',
          `pb-[${dynamicPadding}px]`
        )}>
        <Pressable
          onPress={() => !disabled && !loading && setIsOpen((prev) => !prev)}
          className={cn(
            'h-10 w-full min-w-[152px] rounded-5xl border border-transparent bg-black-700 px-4 text-base text-black-0 focus:bg-black-600 disabled:bg-black-500',
            'placeholder:text-black-100',
            'focus:border-yellow-300',
            error && 'border-red-300',
            isOpen && 'border-yellow-300',
            selectedOption && 'bg-black-600',
            (disabled || loading) && 'bg-black-500 placeholder:text-black-200'
          )}>
          <View className="flex-1 flex-row items-center justify-between">
            <Text
              className={cn(
                'w-[calc(100%-16px)] text-black-0',
                !selectedOption?.label && 'text-black-100',
                loading && 'flex-1 items-center justify-center'
              )}>
              {loading ? (
                <LoaderCircle
                  size={16}
                  className="w-full animate-spin text-yellow-300"
                />
              ) : (
                selectedOption?.label || placeholder || 'Selecione'
              )}
            </Text>
            <ChevronDown
              size={16}
              color={disabled || loading ? '#666666' : '#ffff'}
              className="transition-all duration-300"
              style={{
                transform: [{ rotate: isOpen ? '180deg' : '0deg' }],
              }}
            />
          </View>
        </Pressable>
        {isOpen && (
          <View className="absolute top-full mt-2 w-full rounded-lg border border-transparent bg-black-700">
            <ScrollView
              className="max-h-[150px] p-2"
              nestedScrollEnabled
              showsVerticalScrollIndicator>
              {options?.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    field.onChange(option.value)
                    setIsOpen(false)
                    onValueSelect?.()
                  }}
                  className={cn(
                    'rounded-lg p-2 py-3',
                    field.value === option.value
                      ? 'bg-black-600'
                      : 'hover:bg-black-600'
                  )}>
                  <Text className="text-black-0">{option.label}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </FormControl>
  )
}

import { cn } from 'lib/util'
import { Check, ChevronDown } from 'lucide-react-native'
import * as React from 'react'
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View, ViewProps } from 'react-native'

import { Input } from './input'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

interface SelectProps extends Omit<ViewProps, 'value'> {
  value?: string | number
  onValueChange?: (value: string | number) => void
  placeholder?: string
  options: SelectOption[]
  hasSearch?: boolean
  disabled?: boolean
  error?: boolean
  className?: string
}

const Select = React.forwardRef<View, SelectProps>(
  (
    {
      value,
      onValueChange,
      placeholder = 'Select an option',
      options,
      hasSearch = false,
      disabled = false,
      error,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState('')
    const selectedOption = options.find((opt) => opt.value === value)

    const filteredOptions = React.useMemo(() => {
      if (!hasSearch || !searchQuery) return options
      return options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }, [options, hasSearch, searchQuery])

    const handleSelect = (option: SelectOption) => {
      if (option.disabled) return
      onValueChange?.(option.value)
      setIsOpen(false)
      setSearchQuery('')
    }

    return (
      <View ref={ref} className={cn('relative', className)} {...props}>
        <TouchableOpacity
          onPress={() => !disabled && setIsOpen(true)}
          className={cn(
            'flex-row items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2',
            error && 'border-red-500',
            disabled && 'bg-gray-100 opacity-50'
          )}>
          <Text className={cn('text-base', selectedOption ? 'text-gray-900' : 'text-gray-400')}>
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
          <ChevronDown size={20} className="text-gray-500" />
        </TouchableOpacity>

        <Modal visible={isOpen} transparent animationType="fade">
          <Pressable className="bg-black/20 flex-1" onPress={() => setIsOpen(false)}>
            <View className="m-4 mt-20 overflow-hidden rounded-lg bg-white shadow-lg">
              {hasSearch && (
                <View className="border-b border-gray-200 p-4">
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>
              )}

              <ScrollView className="max-h-80">
                {filteredOptions.map((option, index) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handleSelect(option)}
                    className={cn(
                      'flex-row items-center justify-between px-4 py-3',
                      option.disabled && 'opacity-50',
                      index !== filteredOptions.length - 1 && 'border-b border-gray-100'
                    )}
                    disabled={option.disabled}>
                    <Text
                      className={cn(
                        'text-base',
                        option.disabled ? 'text-gray-400' : 'text-gray-900'
                      )}>
                      {option.label}
                    </Text>
                    {option.value === value && <Check size={20} className="text-blue-500" />}
                  </TouchableOpacity>
                ))}

                {filteredOptions.length === 0 && (
                  <View className="p-4">
                    <Text className="text-center text-gray-500">No options found</Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </Pressable>
        </Modal>
      </View>
    )
  }
)

Select.displayName = 'Select'

export { Select }

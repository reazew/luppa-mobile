import { Text } from 'components/global/text'
import { FormControl } from 'components/ui/form'
import * as DocumentPicker from 'expo-document-picker'
import { cn } from 'lib/util'
import type { LucideIcon } from 'lucide-react-native'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import { Input } from './input'

interface DocumentPickerInputProps {
  value?: DocumentPicker.DocumentPickerResult | null
  onChange?: (result: DocumentPicker.DocumentPickerResult | null) => void
  onBlur?: () => void
  placeholder?: string
  icon?: LucideIcon
  iconSide?: 'left' | 'right'
  error?: boolean
  disabled?: boolean
  className?: string
  options?: {
    type?: string[]
    multiple?: boolean
    copyToCacheDirectory?: boolean
  }
}

export const DocumentPickerInput = React.forwardRef<View, DocumentPickerInputProps>(
  (
    { value, onChange, onBlur, placeholder = 'Select a file', icon, iconSide, error, disabled, className, options },
    ref
  ) => {
    const pickDocument = async () => {
      try {
        const result = await DocumentPicker.getDocumentAsync({
          type: options?.type || '*/*',
          multiple: options?.multiple || false,
          copyToCacheDirectory: options?.copyToCacheDirectory ?? true,
        })

        if (!result.canceled) {
          onChange?.(result)
        }
      } catch (err) {
        console.error('Error picking document:', err)
      }
      onBlur?.()
    }

    const selectedFileName = value && !value.canceled ? value.assets[0]?.name : ''

    return (
      <FormControl className={cn('relative', className)}>
        <View className="flex-row gap-4">
          <View className="flex-1">
            <Input
              placeholder={placeholder}
              icon={icon}
              iconSide={iconSide}
              error={error}
              editable={false}
              value={selectedFileName}
              pointerEvents="none"
            />
          </View>
          <View className="flex-row gap-2">
            {value && !value.canceled ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  onChange?.(null)
                  onBlur?.()
                }}
                className="items-center justify-center rounded-md border border-black-500 px-3 py-2"
                disabled={disabled}>
                <Text size="sm" className="text-black-0">
                  Delete
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={pickDocument}
                className="items-center justify-center rounded-md border border-black-500 px-3 py-2"
                disabled={disabled}>
                <Text size="sm" className="text-black-0">
                  Select file
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </FormControl>
    )
  }
)

DocumentPickerInput.displayName = 'DocumentPickerInput'

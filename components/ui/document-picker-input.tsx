import { Button } from 'components/global/button'
import { FormControl } from 'components/ui/form'
import * as DocumentPicker from 'expo-document-picker'
import { cn } from 'lib/util'
import { Trash, Upload, type LucideIcon } from 'lucide-react-native'
import React from 'react'
import { View } from 'react-native'

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
              pointerEvents="none"
              placeholder={placeholder}
              icon={icon}
              iconSide={iconSide}
              error={error}
              value={selectedFileName}
            />
          </View>
          <View className="flex-row gap-2">
            {value && !value.canceled ? (
              <Button
                onPress={() => {
                  onChange?.(null)
                  onBlur?.()
                }}
                size="icon"
                variant="destructive"
                disabled={disabled}>
                <Button.Icon>
                  <Trash size={16} />
                </Button.Icon>
              </Button>
            ) : (
              <Button onPress={pickDocument} disabled={disabled} size="icon">
                <Button.Icon>
                  <Upload size={16} />
                </Button.Icon>
              </Button>
            )}
          </View>
        </View>
      </FormControl>
    )
  }
)

DocumentPickerInput.displayName = 'DocumentPickerInput'

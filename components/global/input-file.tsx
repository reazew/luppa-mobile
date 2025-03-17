import { Button } from 'components/ui/button'
import { FileInput, FileUploader } from 'components/ui/file-upload'
import { Input } from 'components/ui/input'
import { cn } from 'lib/util'
import type { LucideIcon } from 'lucide-react-native'
import { Image, Trash } from 'lucide-react-native'
import * as React from 'react'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { Text, View } from 'react-native'

export interface InputFileProps<T extends FieldValues> {
  field: ControllerRenderProps<T>
  maxFiles?: number
  maxSize?: number
  allowedTypes?: string[]
  label?: string
  placeholder?: string
  children?: React.ReactNode
  icon?: LucideIcon
  className?: string
}

export const InputFile = <T extends FieldValues>({
  field,
  maxFiles = 1,
  maxSize,
  allowedTypes,
  placeholder = 'Select a file',
  children,
  icon: Icon = Image,
  className,
}: InputFileProps<T>) => {
  const hasFile = field.value && field.value.length > 0

  return (
    <FileUploader
      value={field.value}
      onValueChange={field.onChange}
      maxFiles={maxFiles}
      maxSize={maxSize}
      allowedTypes={allowedTypes}
      className={cn('w-full', className)}>
      {children ? (
        children
      ) : (
        <View className="flex-row items-center gap-2">
          <View className="flex-1">
            <Input
              editable={false}
              icon={Icon}
              placeholder={placeholder}
              value={hasFile ? field.value[0]?.name : ''}
            />
          </View>

          <View>
            {hasFile ? (
              <Button variant="outline" onPress={() => field.onChange(null)}>
                <View className="flex-row items-center gap-2">
                  <Trash size={20} />
                  <Text>Delete</Text>
                </View>
              </Button>
            ) : (
              <FileInput>
                <Button variant="outline">
                  <Text>Select File</Text>
                </Button>
              </FileInput>
            )}
          </View>
        </View>
      )}
    </FileUploader>
  )
}

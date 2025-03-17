import * as DocumentPicker from 'expo-document-picker'
import { cn } from 'lib/util'
import { Trash2 } from 'lucide-react-native'
import * as React from 'react'
import { Text, TouchableOpacity, View, ViewProps } from 'react-native'

type FileInfo = {
  uri: string
  name: string
  size: number
  mimeType: string
}

type FileUploaderContextType = {
  removeFile: (index: number) => void
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  orientation: 'horizontal' | 'vertical'
}

const FileUploaderContext = React.createContext<FileUploaderContextType | null>(null)

export const useFileUpload = () => {
  const context = React.useContext(FileUploaderContext)
  if (!context) {
    throw new Error('useFileUpload must be used within a FileUploaderProvider')
  }
  return context
}

interface FileUploaderProps extends ViewProps {
  value: FileInfo[] | null
  onValueChange: (value: FileInfo[] | null) => void
  maxFiles?: number
  maxSize?: number
  allowedTypes?: string[]
  orientation?: 'horizontal' | 'vertical'
}

export const FileUploader = React.forwardRef<View, FileUploaderProps>(
  (
    {
      className,
      value,
      onValueChange,
      maxFiles = 1,
      maxSize = 4 * 1024 * 1024, // 4MB
      allowedTypes = ['*/*'],
      orientation = 'vertical',
      children,
      ...props
    },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = React.useState(-1)

    const removeFile = React.useCallback(
      (index: number) => {
        if (!value) return
        const newFiles = value.filter((_, i) => i !== index)
        onValueChange(newFiles.length ? newFiles : null)
      },
      [value, onValueChange]
    )

    return (
      <FileUploaderContext.Provider
        value={{
          removeFile,
          activeIndex,
          setActiveIndex,
          orientation,
        }}>
        <View ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </View>
      </FileUploaderContext.Provider>
    )
  }
)

FileUploader.displayName = 'FileUploader'

interface FileUploaderContentProps extends ViewProps {
  className?: string
}

export const FileUploaderContent = React.forwardRef<View, FileUploaderContentProps>(
  ({ children, className, ...props }, ref) => {
    const { orientation } = useFileUpload()

    return (
      <View className={cn('w-full px-4', className)} {...props} ref={ref}>
        <View
          className={cn(
            'gap-1 rounded-lg',
            orientation === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col'
          )}>
          {children}
        </View>
      </View>
    )
  }
)

FileUploaderContent.displayName = 'FileUploaderContent'

interface FileUploaderItemProps extends ViewProps {
  index: number
  fileName: string
}

export const FileUploaderItem = React.forwardRef<View, FileUploaderItemProps>(
  ({ className, index, fileName, ...props }, ref) => {
    const { removeFile, activeIndex } = useFileUpload()
    const isSelected = index === activeIndex

    return (
      <View
        ref={ref}
        className={cn(
          'flex-row items-center justify-between rounded-lg bg-gray-50 p-3',
          isSelected && 'bg-gray-100',
          className
        )}
        {...props}>
        <Text className="flex-1 text-sm font-medium text-gray-700">{fileName}</Text>
        <TouchableOpacity onPress={() => removeFile(index)} className="ml-2">
          <Trash2 size={20} className="text-gray-500" />
        </TouchableOpacity>
      </View>
    )
  }
)

FileUploaderItem.displayName = 'FileUploaderItem'

interface FileInputProps extends ViewProps {
  onSelect?: (files: FileInfo[]) => void
  maxFiles?: number
  allowedTypes?: string[]
}

export const FileInput = React.forwardRef<View, FileInputProps>(
  ({ className, children, onSelect, maxFiles = 1, allowedTypes = ['*/*'], ...props }, ref) => {
    const handleFilePick = async () => {
      try {
        const result = await DocumentPicker.getDocumentAsync({
          type: allowedTypes,
          multiple: maxFiles > 1,
        })
        if (result.assets) {
          const files: FileInfo[] = result.assets.map((asset) => ({
            uri: asset.uri,
            name: asset.name,
            size: asset.size ?? 0,
            mimeType: asset.mimeType || '*/*',
          }))
          onSelect?.(files)
        }
      } catch (err) {
        console.error('Error picking document:', err)
      }
    }

    return (
      <TouchableOpacity onPress={handleFilePick} className={cn('w-full', className)}>
        <View ref={ref} {...props}>
          {children}
        </View>
      </TouchableOpacity>
    )
  }
)

FileInput.displayName = 'FileInput'

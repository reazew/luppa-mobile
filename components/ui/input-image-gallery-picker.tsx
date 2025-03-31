import { CameraIcon } from 'assets/icons'
import { Button } from 'components/global/button'
import { FormControl } from 'components/ui/form'
import { Label } from 'components/ui/label'
import * as ImagePicker from 'expo-image-picker'
import { cn } from 'lib/util'
import { Camera, ImageIcon, Trash2 } from 'lucide-react-native'
import * as React from 'react'
import { Image, View } from 'react-native'

interface InputImageGalleryPickerProps {
  value?: string[]
  onChange: (value: string[]) => void
  onBlur?: () => void
  error?: boolean
  disabled?: boolean
  className?: string
  label?: string
  previewSize?: {
    width: number
    height: number
  }
  placeholderIcon?: React.ReactNode
  maxImages?: number
}

const DEFAULT_PREVIEW_SIZE = {
  width: 100,
  height: 100,
}

export const InputImageGalleryPicker = React.forwardRef<View, InputImageGalleryPickerProps>(
  (
    {
      value = [],
      onChange,
      onBlur,
      error,
      disabled,
      className,
      label = 'Fotos',
      previewSize = DEFAULT_PREVIEW_SIZE,
      placeholderIcon = <CameraIcon />,
      maxImages = 6,
    },
    ref
  ) => {
    const pickImages = async () => {
      if (disabled) return

      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: true,
          selectionLimit: maxImages - value.length,
          quality: 0.8,
        })

        if (!result.canceled && result.assets) {
          const newImages = result.assets.map((asset) => asset.uri)
          onChange([...value, ...newImages].slice(0, maxImages))
          onBlur?.()
        }
      } catch (err) {
        console.error('Error picking images:', err)
      }
    }

    const takePhoto = async () => {
      if (disabled || value.length >= maxImages) return

      try {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync()

        if (!permissionResult.granted) {
          alert('Você precisa permitir o acesso à câmera para tirar uma foto')
          return
        }

        const result = await ImagePicker.launchCameraAsync({
          quality: 0.8,
        })

        if (!result.canceled && result.assets[0]) {
          onChange([...value, result.assets[0].uri].slice(0, maxImages))
          onBlur?.()
        }
      } catch (err) {
        console.error('Error taking photo:', err)
      }
    }

    const removeImage = (index: number) => {
      if (disabled) return
      const newImages = value.filter((_, i) => i !== index)
      onChange(newImages)
      onBlur?.()
    }

    return (
      <FormControl className={cn('relative', className)} ref={ref}>
        <View className="items-center gap-4 rounded-3xl bg-black-700 p-6">
          <Label className="text-base">{label}</Label>

          <View className="flex-row flex-wrap justify-center gap-2">
            {value.map((uri, index) => (
              <View
                key={uri}
                className={cn(
                  'relative rounded-lg border border-transparent bg-black-600',
                  error && 'border-red-300',
                  disabled && 'opacity-50'
                )}
                style={{ width: previewSize.width, height: previewSize.height }}>
                <Image source={{ uri }} className="h-full w-full rounded-lg" />
                <Button
                  onPress={() => removeImage(index)}
                  size="icon"
                  variant="destructive"
                  className="absolute right-1 top-1 rounded-full">
                  <Button.Icon>
                    <Trash2 size={14} />
                  </Button.Icon>
                </Button>
              </View>
            ))}

            {value.length < maxImages && (
              <View
                className={cn(
                  'relative rounded-lg border border-transparent bg-black-600',
                  error && 'border-red-300',
                  disabled && 'opacity-50'
                )}
                style={{ width: previewSize.width, height: previewSize.height }}>
                <View className="flex-1 items-center justify-center">{placeholderIcon}</View>
              </View>
            )}
          </View>

          <View className="flex-1 items-center gap-4">
            {value.length < maxImages && (
              <>
                <Button onPress={pickImages} variant="outline" className="min-w-[152px]">
                  <Button.Icon>
                    <ImageIcon size={16} />
                  </Button.Icon>
                  <Button.Text>Escolher na galeria</Button.Text>
                </Button>

                <Button onPress={takePhoto} variant="outline" className="min-w-[152px]">
                  <Button.Icon>
                    <Camera size={16} />
                  </Button.Icon>
                  <Button.Text>Tirar agora</Button.Text>
                </Button>
              </>
            )}
          </View>
        </View>
      </FormControl>
    )
  }
)

InputImageGalleryPicker.displayName = 'InputImageGalleryPicker'

import { GalleryIcon } from 'assets/icons'
import { Button } from 'components/global/button'
import { Text } from 'components/global/text'
import { FormControl } from 'components/ui/form'
import { Label } from 'components/ui/label'
import * as ImagePicker from 'expo-image-picker'
import { cn } from 'lib/util'
import { Camera, ImageIcon, Trash2 } from 'lucide-react-native'
import * as React from 'react'
import { Image, View } from 'react-native'

interface InputImageGalleryPickerProps {
  value?: { [key: number]: string }
  onChange: (value: { [key: number]: string }) => void
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
  width: 90,
  height: 90,
}

export const InputImageGalleryPicker = React.forwardRef<
  View,
  InputImageGalleryPickerProps
>(
  (
    {
      value = {},
      onChange,
      onBlur,
      error,
      disabled,
      className,
      label = 'Fotos',
      previewSize = DEFAULT_PREVIEW_SIZE,
      placeholderIcon = <GalleryIcon />,
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
          selectionLimit: maxImages - Object.keys(value).length,
          quality: 0.8,
        })

        if (!result.canceled && result.assets) {
          const availableSlots = [...Array(maxImages)]
            .map((_, i) => i)
            .filter((i) => !value[i])

          const newImages = { ...value }
          result.assets.forEach((asset, idx) => {
            if (availableSlots[idx] !== undefined) {
              newImages[availableSlots[idx]] = asset.uri.toString()
            }
          })

          onChange(newImages)
          onBlur?.()
        }
      } catch (err) {
        console.error('Error picking images:', err)
      }
    }

    const takePhoto = async () => {
      if (disabled || Object.keys(value).length >= maxImages) return

      try {
        const permissionResult =
          await ImagePicker.requestCameraPermissionsAsync()

        if (!permissionResult.granted) {
          alert('Você precisa permitir o acesso à câmera para tirar uma foto')
          return
        }

        const result = await ImagePicker.launchCameraAsync({
          quality: 0.8,
        })

        if (!result.canceled && result.assets[0]) {
          const firstEmptySlot = [...Array(maxImages)]
            .map((_, i) => i)
            .find((i) => !value[i])

          if (firstEmptySlot !== undefined) {
            onChange({
              ...value,
              [firstEmptySlot]: result.assets[0].uri.toString(),
            })
            onBlur?.()
          }
        }
      } catch (err) {
        console.error('Error taking photo:', err)
      }
    }

    const removeImage = (index: number) => {
      if (disabled) return
      const newImages = { ...value }
      delete newImages[index]
      onChange(newImages)
      onBlur?.()
    }

    return (
      <FormControl className={cn('relative', className)} ref={ref}>
        <View className="items-center gap-6 rounded-3xl bg-black-700 p-6">
          <View className="flex flex-col items-center gap-2">
            <Label className="text-base">{label}</Label>
            <Text size="sm" className="text-black-0">
              Selecione até {maxImages} fotos
            </Text>
          </View>
          <View className="flex flex-row flex-wrap items-center justify-center gap-2">
            {[...Array(maxImages)].map((_, index) => (
              <View
                key={index}
                className={cn(
                  'relative rounded-2xl border border-transparent bg-black-600',
                  error && 'border-red-300',
                  disabled && 'opacity-50'
                )}
                style={{
                  width: previewSize.width,
                  height: previewSize.height,
                }}>
                {value[index] ? (
                  <>
                    <Image
                      source={{ uri: value[index] }}
                      className="h-full w-full rounded-lg"
                    />
                    {!disabled && (
                      <Button
                        onPress={() => removeImage(index)}
                        size="icon"
                        variant="destructive"
                        className="absolute right-1 top-1 rounded-full">
                        <Button.Icon>
                          <Trash2 size={14} />
                        </Button.Icon>
                      </Button>
                    )}
                  </>
                ) : (
                  <View className="flex-1 items-center justify-center">
                    {placeholderIcon}
                  </View>
                )}
              </View>
            ))}
          </View>

          <View className="flex flex-row items-center justify-center gap-4">
            <Button
              onPress={pickImages}
              variant="outline"
              className="max-w-[165px]">
              <Button.Icon>
                <ImageIcon size={16} />
              </Button.Icon>
              <Button.Text>Escolher na galeria</Button.Text>
            </Button>

            <Button
              onPress={takePhoto}
              variant="outline"
              className="max-w-[115px]">
              <Button.Icon>
                <Camera size={16} />
              </Button.Icon>
              <Button.Text>Tirar agora</Button.Text>
            </Button>
          </View>
        </View>
      </FormControl>
    )
  }
)

InputImageGalleryPicker.displayName = 'InputImageGalleryPicker'

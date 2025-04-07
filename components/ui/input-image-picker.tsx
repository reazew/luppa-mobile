import { CameraIcon } from 'assets/icons'
import { Button } from 'components/global/button'
import { FormControl } from 'components/ui/form'
import { Label } from 'components/ui/label'
import * as ImagePicker from 'expo-image-picker'
import { cn } from 'lib/util'
import { Camera, ImageIcon, Trash2 } from 'lucide-react-native'
import * as React from 'react'
import { Image, View } from 'react-native'

interface InputImagePickerProps {
  value?: ImagePicker.ImagePickerAsset[] | null
  onChange: (value: ImagePicker.ImagePickerAsset[]) => void
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
  showTakePhotoButton?: boolean
}

const DEFAULT_PREVIEW_SIZE = {
  width: 120,
  height: 120,
}

export const InputImagePicker = React.forwardRef<View, InputImagePickerProps>(
  (
    {
      value,
      onChange,
      onBlur,
      error,
      disabled,
      className,
      label = 'Foto de perfil',
      previewSize = DEFAULT_PREVIEW_SIZE,
      placeholderIcon = <CameraIcon />,
      showTakePhotoButton = true,
    },
    ref
  ) => {
    const pickImage = async () => {
      if (disabled) return

      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })

        if (!result.canceled && result.assets[0]) {
          onChange([result.assets[0]])
          onBlur?.()
        }
      } catch (err) {
        console.error('Error picking image:', err)
      }
    }

    const takePhoto = async () => {
      if (disabled) return

      try {
        const permissionResult =
          await ImagePicker.requestCameraPermissionsAsync()

        if (!permissionResult.granted) {
          alert('Você precisa permitir o acesso à câmera para tirar uma foto')
          return
        }

        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })

        if (!result.canceled && result.assets[0]) {
          onChange([result.assets[0]])
          onBlur?.()
        }
      } catch (err) {
        console.error('Error taking photo:', err)
      }
    }

    const removeImage = () => {
      if (disabled) return
      onChange([])
      onBlur?.()
    }

    return (
      <FormControl className={cn('relative', className)} ref={ref}>
        <View className="items-center gap-4 rounded-3xl bg-black-600 p-6">
          <Label className="text-base">{label}</Label>
          <View
            className={cn(
              'relative flex-1 rounded-full border border-transparent bg-black-500',
              error && 'border-red-300',
              disabled && 'opacity-50'
            )}
            style={{ width: previewSize.width, height: previewSize.height }}>
            {value && value.length > 0 ? (
              <>
                <Image
                  source={{ uri: value[0].uri }}
                  className="h-full w-full rounded-full"
                />
                <Button
                  onPress={removeImage}
                  size="icon"
                  variant="destructive"
                  className="absolute right-2 top-2 rounded-full">
                  <Button.Icon>
                    <Trash2 size={16} />
                  </Button.Icon>
                </Button>
              </>
            ) : (
              <View className="flex-1 items-center justify-center">
                {placeholderIcon}
              </View>
            )}
          </View>

          <View className="flex-1 items-center gap-4">
            <Button
              onPress={pickImage}
              variant="outline"
              className="min-w-[152px]">
              <Button.Icon>
                <ImageIcon size={16} />
              </Button.Icon>
              <Button.Text>Escolher na galeria</Button.Text>
            </Button>

            {showTakePhotoButton && (
              <Button
                onPress={takePhoto}
                variant="outline"
                className="min-w-[152px]">
                <Button.Icon>
                  <Camera size={16} />
                </Button.Icon>
                <Button.Text>Tirar agora</Button.Text>
              </Button>
            )}
          </View>
        </View>
      </FormControl>
    )
  }
)

InputImagePicker.displayName = 'InputImagePicker'

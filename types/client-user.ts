import type { ImagePickerAsset } from 'expo-image-picker'

export type ClientUser = {
  name: string
  email: string
  phone: string
  birthDate: string
  imageFile: ImagePickerAsset[] | null
  avatarUrl: string
}

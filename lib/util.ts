import { type ClassValue, clsx } from 'clsx'
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'
import { Dimensions } from 'react-native'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function findById(id: number, list: any[]) {
  const found = list.find((item) => String(item.key) === String(id))
  return found ?? null
}

export function findByName(name: string, list: any[]) {
  const found = list.find((item) => item.value === name)
  return found ?? null
}

export function transformFileToUrl(file: ImagePicker.ImagePickerAsset | null) {
  if (!file) return null
  return file.uri
}

export const statusBarHeight = Constants.statusBarHeight
export const bottomBarHeight = 34
export const screenHeight = Dimensions.get('window').height

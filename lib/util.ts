import { type ClassValue, clsx } from 'clsx'
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

import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { Modal, Platform, View } from 'react-native'

interface DatePickerProps {
  value?: Date
  onChange: (date: Date) => void
  isOpen: boolean
  onClose: () => void
  minDate?: Date
  maxDate?: Date
}

export function DatePicker({
  value,
  onChange,
  isOpen,
  onClose,
  minDate,
  maxDate,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(value || new Date())

  const handleChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      if (event.type === 'set' && date) {
        setSelectedDate(date)
        onChange(date)
        onClose()
      } else if (event.type === 'dismissed') {
        onClose()
      }
    } else {
      // iOS
      if (date) {
        const isDayChange =
          selectedDate.getFullYear() === date.getFullYear() &&
          selectedDate.getMonth() === date.getMonth() &&
          selectedDate.getDate() !== date.getDate()

        setSelectedDate(date)

        if (isDayChange) {
          onChange(date)
          onClose()
        }
      }
    }
  }

  if (!isOpen) return null

  if (Platform.OS === 'android') {
    return (
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display="default"
        onChange={handleChange}
        minimumDate={minDate}
        maximumDate={maxDate}
        locale="pt-BR"
      />
    )
  }

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isOpen}
      onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black-900/50">
        <View className="w-[90%] rounded-3xl bg-black-500 p-4">
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="inline"
            onChange={handleChange}
            minimumDate={minDate}
            maximumDate={maxDate}
            locale="pt-BR"
          />
        </View>
      </View>
    </Modal>
  )
}

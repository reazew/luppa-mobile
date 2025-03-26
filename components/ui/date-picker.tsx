import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { Platform } from 'react-native'

interface DatePickerProps {
  value?: Date
  onChange: (date: Date) => void
  isOpen: boolean
  onClose: () => void
  minDate?: Date
  maxDate?: Date
}

export function DatePicker({ value, onChange, isOpen, onClose, minDate, maxDate }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(value || new Date())

  const handleChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      onClose()
    }

    if (event.type === 'set' && date) {
      setSelectedDate(date)
      onChange(date)
      if (Platform.OS === 'ios') {
        onClose()
      }
    } else if (event.type === 'dismissed') {
      onClose()
    }
  }

  if (!isOpen) return null

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

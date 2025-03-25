import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { Modal, Platform, Pressable } from 'react-native'

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

  if (Platform.OS === 'ios') {
    return (
      <Modal visible={isOpen} transparent animationType="fade">
        <Pressable className="bg-black/50 flex-1 justify-end" onPress={onClose}>
          <Pressable className="bg-white p-4">
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="spinner"
              onChange={(event, date) => {
                if (event.type !== 'dismissed' && date) {
                  setSelectedDate(date)
                  onChange(date)
                }
              }}
              minimumDate={minDate}
              maximumDate={maxDate}
              locale="pt-BR"
            />
          </Pressable>
        </Pressable>
      </Modal>
    )
  }

  return isOpen ? (
    <DateTimePicker
      value={selectedDate}
      mode="date"
      display="default"
      onChange={(event, date) => {
        onClose()
        if (event.type === 'set' && date) {
          setSelectedDate(date)
          onChange(date)
        }
      }}
      minimumDate={minDate}
      maximumDate={maxDate}
    />
  ) : null
}

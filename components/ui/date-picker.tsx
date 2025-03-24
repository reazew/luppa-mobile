import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { Modal, Pressable, View } from 'react-native'
import DateTimePicker, { DateType, useDefaultClassNames } from 'react-native-ui-datepicker'

interface DatePickerProps {
  value?: Date
  onChange: (date: Date) => void
  isOpen: boolean
  onClose: () => void
  minDate?: Date
  maxDate?: Date
}

export function DatePicker({ value, onChange, isOpen, onClose, minDate, maxDate }: DatePickerProps) {
  const [selected, setSelected] = useState<DateType>(value)
  const defaultClassNames = useDefaultClassNames()

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <Pressable className="bg-black/50 flex-1" onPress={onClose}>
        <View className="mt-auto bg-yellow-300 p-4">
          <DateTimePicker
            mode="single"
            date={selected}
            onChange={({ date }) => {
              if (date) {
                const newDate = date instanceof Date ? date : new Date(date as string)
                setSelected(date)
                onChange(newDate)
                onClose()
              }
            }}
            minDate={minDate}
            maxDate={maxDate}
            locale={ptBR.code}
            classNames={{
              ...defaultClassNames,
              day: 'w-10 h-10 items-center justify-center rounded-full',
              today: 'border border-amber-500',
              selected: 'bg-amber-500 border-amber-500',
              selected_label: 'text-white font-bold',
            }}
          />
        </View>
      </Pressable>
    </Modal>
  )
}

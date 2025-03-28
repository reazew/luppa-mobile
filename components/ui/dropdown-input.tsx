import { cssInterop } from 'nativewind'
import { useState } from 'react'
import { View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

cssInterop(Dropdown, {
  className: 'style',
  placeholderStyle: 'style',
  selectedTextStyle: 'style',
  containerStyle: 'style',
  itemContainerStyle: 'style',
  itemTextStyle: 'style',
  selectedTextProps: 'style',
  iconStyle: 'style',
})
const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
]

const DropdownComponent = () => {
  const [value, setValue] = useState(null)
  const [isFocus, setIsFocus] = useState(false)

  return (
    <View className="relative w-full">
      <Dropdown
        // className={cn(
        //   'h-10 w-full min-w-[152px] rounded-5xl border border-transparent bg-black-700 px-4 text-base text-black-0 focus:bg-black-600',
        //   isFocus && 'border-yellow-300'
        // )}
        // placeholderStyle="text-black-100"
        // selectedTextStyle="text-black-0"
        // containerStyle="mt-1 rounded-lg border border-transparent bg-black-700 p-2"
        // itemContainerStyle="rounded-lg p-2 hover:bg-black-600"
        // itemTextStyle="text-black-0"
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Selecione"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value)
          setIsFocus(false)
        }}
      />
    </View>
  )
}

export default DropdownComponent

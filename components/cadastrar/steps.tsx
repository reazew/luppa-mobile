import { Text } from 'components/global/text'
import { bottomBarHeight, cn, statusBarHeight } from 'lib/util'
import { Check } from 'lucide-react-native'
import { cssInterop } from 'nativewind'
import { Fragment } from 'react'
import { Platform, View } from 'react-native'

type StepsProps = {
  currentStepIndex: number
  totalSteps?: number
}

cssInterop(Check, {
  className: 'style',
})

export const Steps = ({ currentStepIndex, totalSteps = 4 }: StepsProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1)

  const renderStep = (index: number) => {
    const isActive = index <= currentStepIndex + 1
    const isFirst = index === 1
    const isLast = index === totalSteps

    if (isFirst) {
      return (
        <View
          key={index}
          className={cn(
            'h-[24px] w-[24px] items-center justify-center rounded-full',
            isActive ? 'bg-yellow-300 text-black-900' : 'bg-black-600'
          )}>
          <Text className={cn(isActive ? ' text-black-900' : 'text-black-0')}>
            1
          </Text>
        </View>
      )
    }

    if (isLast) {
      return (
        <Fragment key={index}>
          <View
            className={cn(
              'h-[4px] flex-1 rounded-full bg-black-600',
              steps.length > 3 ? 'max-w-full' : 'max-w-[36px]'
            )}>
            <View
              className={cn(
                'h-[4px] rounded-full bg-yellow-300 transition-all ease-out',
                isActive ? 'w-full' : 'w-0'
              )}
            />
          </View>
          <View
            key={index}
            className={cn(
              'h-[24px] w-[24px]  items-center justify-center rounded-full',
              isActive ? 'bg-yellow-300' : 'bg-black-600'
            )}>
            <Check
              size={16}
              className={cn(isActive ? 'text-black-900' : 'text-black-0')}
            />
          </View>
        </Fragment>
      )
    }

    return (
      <Fragment key={index}>
        <View
          className={cn(
            'h-[4px] flex-1 rounded-full bg-black-600',
            steps.length > 3 ? 'max-w-full' : 'max-w-[36px]'
          )}>
          <View
            className={cn(
              'h-[4px] rounded-full bg-yellow-300 transition-all ease-out',
              isActive ? 'w-full' : 'w-0'
            )}
          />
        </View>
        <View
          key={index}
          className={cn(
            'h-[24px] w-[24px] items-center justify-center rounded-full',
            isActive ? 'bg-yellow-300' : 'bg-black-600'
          )}>
          <Text className={cn(isActive ? ' text-black-900' : 'text-black-0')}>
            {index}
          </Text>
        </View>
      </Fragment>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: statusBarHeight,
        paddingBottom:
          Platform.OS === 'ios' ? bottomBarHeight + 32 : bottomBarHeight + 10,
      }}>
      <View
        className={cn(
          'flex-row items-center gap-2 bg-transparent px-6 py-8',
          steps.length > 3 ? 'justify-center' : 'justify-start'
        )}>
        {steps.map(renderStep)}
      </View>
    </View>
  )
}

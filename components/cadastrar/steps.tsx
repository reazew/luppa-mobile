import { bottomBarHeight, statusBarHeight } from 'lib/util'
import { Platform, View } from 'react-native'

type StepsProps = {
  currentStepIndex: number
  totalSteps?: number
}

export const Steps = ({ currentStepIndex, totalSteps = 4 }: StepsProps) => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: statusBarHeight,
        paddingBottom: Platform.OS === 'ios' ? bottomBarHeight + 32 : bottomBarHeight + 10,
      }}>
      <View className="flex-row items-center justify-center gap-2 bg-background px-6 py-8">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            className={`h-[8px] flex-1 rounded-full ${index <= currentStepIndex ? 'bg-yellow-300' : 'bg-black-500'}`}
          />
        ))}
      </View>
    </View>
  )
}

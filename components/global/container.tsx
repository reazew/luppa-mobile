import { bottomBarHeight, cn, statusBarHeight } from 'lib/util'
import { Platform, View } from 'react-native'

export const Container = ({
  children,
  className,
  hasHeader = false,
}: {
  children: React.ReactNode
  className?: string
  hasHeader?: boolean
}) => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: hasHeader ? 0 : statusBarHeight,
        paddingBottom: Platform.OS === 'ios' ? bottomBarHeight + 32 : bottomBarHeight + 10,
      }}
      className={cn(className)}>
      {children}
    </View>
  )
}

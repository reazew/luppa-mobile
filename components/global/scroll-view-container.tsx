import { cn } from 'lib/util'
import { forwardRef } from 'react'
import { ScrollView as RNScrollView } from 'react-native'

export const ScrollView = forwardRef<
  RNScrollView,
  {
    children: React.ReactNode
    className?: string
    automaticallyAdjustKeyboardInsets?: boolean
  }
>(({ children, className }, ref) => {
  return (
    <RNScrollView
      ref={ref}
      scrollsToTop
      className={cn('bg-background', className)}
      keyboardShouldPersistTaps="handled"
      alwaysBounceVertical={false}
      automaticallyAdjustKeyboardInsets
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{
        flex: 1,
      }}>
      {children}
    </RNScrollView>
  )
})

ScrollView.displayName = 'ScrollView'

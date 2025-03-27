import { cn } from 'lib/util'
import { ScrollView as RNScrollView } from 'react-native'

export const ScrollView = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <RNScrollView
      className={cn('bg-background', className)}
      keyboardShouldPersistTaps="handled"
      alwaysBounceVertical={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{
        flex: 1,
      }}>
      {children}
    </RNScrollView>
  )
}

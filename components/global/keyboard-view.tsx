import { cn } from 'lib/util'
import { KeyboardAvoidingView, Platform } from 'react-native'

export const KeyboardView = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
      style={{ flex: 1, flexGrow: 1 }}
      className={cn('bg-background', className)}>
      {children}
    </KeyboardAvoidingView>
  )
}

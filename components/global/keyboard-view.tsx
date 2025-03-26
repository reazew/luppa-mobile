import { cn } from 'lib/util'
import { KeyboardAvoidingView, Platform } from 'react-native'

export const KeyboardView = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      className={cn(className)}>
      {children}
    </KeyboardAvoidingView>
  )
}

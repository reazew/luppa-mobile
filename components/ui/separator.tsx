import { cn } from 'lib/util'
import * as React from 'react'
import { View, ViewProps } from 'react-native'

interface SeparatorProps extends ViewProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export const Separator = React.forwardRef<View, SeparatorProps>(
  ({ orientation = 'horizontal', className, ...props }, ref) => (
    <View
      ref={ref}
      style={[
        orientation === 'horizontal'
          ? { height: 1, width: '100%' }
          : { height: '100%', width: 1 },
      ]}
      className={cn(
        'flex-1 shrink-0 bg-black-500',
        orientation === 'horizontal' ? 'h-[2px] w-full' : 'h-full w-[1px]',
        className
      )}
      {...props}
    />
  )
)

Separator.displayName = 'Separator'

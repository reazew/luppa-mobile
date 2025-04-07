import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'lib/util'
import * as React from 'react'
import { Text, TextProps } from 'react-native'

const labelVariants = cva('text-sm font-bold text-black-0')

export interface LabelProps
  extends TextProps,
    VariantProps<typeof labelVariants> {
  className?: string
}

const Label = React.forwardRef<Text, LabelProps>(
  ({ className, ...props }, ref) => (
    <Text ref={ref} className={cn(labelVariants(), className)} {...props} />
  )
)

Label.displayName = 'Label'

export { Label }

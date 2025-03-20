import { cva, VariantProps } from 'class-variance-authority'
import { cn } from 'lib/util'
import React from 'react'
import { Platform, Text as RNText } from 'react-native'

const textVariants = cva('text-black-0 leading-normal', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      huge: 'text-2xl',
      'huge-2': 'text-[2rem]',
      'huge-3': 'text-4xl',
    },
    weight: {
      regular: 'font-normal',
      bold: 'font-semibold',
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'regular',
  },
})

interface TextProps extends VariantProps<typeof textVariants> {
  children?: React.ReactNode
  className?: string
}

const Text = ({ size, weight, children, className, ...props }: TextProps) => {
  return (
    <RNText
      className={cn(
        Platform.OS === 'ios' ? '' : 'leading-normal',
        textVariants({ size, weight }),
        className
      )}
      {...props}>
      {children}
    </RNText>
  )
}

Text.displayName = 'Text'

export { Text, textVariants }

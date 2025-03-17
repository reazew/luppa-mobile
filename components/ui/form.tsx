import { Label } from 'components/ui/label'
import { cn } from 'lib/util'
import * as React from 'react'
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form'
import { Text, TextProps, View, ViewProps } from 'react-native'

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue)

interface FormItemProps extends ViewProps {
  className?: string
}

const FormItem = React.forwardRef<View, FormItemProps>(({ className, style, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <View ref={ref} className={cn('mb-4', className)} style={style} {...props} />
    </FormItemContext.Provider>
  )
})

interface FormLabelProps extends TextProps {
  className?: string
}

const FormLabel = React.forwardRef<Text, FormLabelProps>(({ className, ...props }, ref) => {
  const { error } = useFormField()

  return <Label ref={ref} className={cn(error && 'text-red-500', className)} {...props} />
})

const FormControl = React.forwardRef<View, ViewProps>(({ ...props }, ref) => {
  return <View ref={ref} {...props} />
})

interface FormDescriptionProps extends TextProps {
  className?: string
}

const FormDescription = React.forwardRef<Text, FormDescriptionProps>(
  ({ className, style, ...props }, ref) => {
    return (
      <Text ref={ref} className={cn('text-xs text-gray-500', className)} style={style} {...props} />
    )
  }
)

interface FormMessageProps extends TextProps {
  className?: string
}

const FormMessage = React.forwardRef<Text, FormMessageProps>(
  ({ className, children, style, ...props }, ref) => {
    const { error } = useFormField()
    const body = error ? String(error?.message) : children

    if (!body) {
      return null
    }

    return (
      <Text
        ref={ref}
        className={cn('mt-1 text-xs text-red-500', className)}
        style={style}
        {...props}>
        {body}
      </Text>
    )
  }
)

// Add display names
FormItem.displayName = 'FormItem'
FormLabel.displayName = 'FormLabel'
FormControl.displayName = 'FormControl'
FormDescription.displayName = 'FormDescription'
FormMessage.displayName = 'FormMessage'

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
}

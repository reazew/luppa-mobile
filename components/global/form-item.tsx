import { SelectField, type Option } from 'components/global/select-field'
import { DatePicker } from 'components/ui/date-picker'
import { DocumentPickerInput } from 'components/ui/document-picker-input'
import {
  FormLabel,
  FormMessage,
  FormItem as OriginalFormItem,
} from 'components/ui/form'
import { InputImageGalleryPicker } from 'components/ui/input-image-gallery-picker'
import { InputImagePicker } from 'components/ui/input-image-picker'
import { MaskedInput } from 'components/ui/masked-input'
import { format } from 'date-fns'
import { cn } from 'lib/util'
import { debounce } from 'lodash'
import { type LucideIcon } from 'lucide-react-native'
import type { RefObject } from 'react'
import React, { useCallback, useEffect, useState } from 'react'
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form'
import { TouchableOpacity, View, type TextInput } from 'react-native'

import { Input } from '../ui/input'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

type FormFieldType =
  | 'input'
  | 'textarea'
  | 'masked-input'
  | 'select'
  | 'image-picker'
  | 'image-gallery-picker'
  | 'toggle-group'
  | 'birth-date'
  | 'document-picker'

interface FormItemProps<T extends FieldValues> {
  field: ControllerRenderProps<T>
  fieldType: FormFieldType
  formContext?: UseFormReturn<any>
  label?: string
  placeholder?: string
  icon?: LucideIcon
  iconSide?: 'left' | 'right'
  selectEmptyMessage?: string
  selectHasSearch?: boolean
  hideSupportiveText?: boolean
  className?: string
  error?: boolean
  disabled?: boolean
  loading?: boolean
  options?: Option[]
  imagePreviewSize?: { width: number; height: number }
  maxFiles?: number
  toggleType?: 'single' | 'multiple'
  displayVariant?: 'default' | 'row'
  toggleOptions?: {
    label: string
    value: string
    description: string
    icon?: 'client' | 'business' | 'pix' | 'credit-card' | 'debit-card'
  }[]
  documentPickerOptions?: {
    type?: string[]
    multiple?: boolean
    copyToCacheDirectory?: boolean
  }
  mask?: string
  maskType?: 'date' | 'time' | 'currency'
  maskOptions?: {
    format?: string
  } & Record<string, any>
  keyboardType?:
    | 'default'
    | 'ascii-capable'
    | 'decimal-pad'
    | 'name-phone-pad'
    | 'number-pad'
    | 'numbers-and-punctuation'
    | 'numeric'
    | 'phone-pad'
    | 'email-address'
    | 'visible-password'
    | 'twitter'
    | 'url'
    | 'web-search'
  onSubmitEditing?: () => void
  ref?: RefObject<TextInput>
  onValueSelect?: () => void
  placeholderIcon?: React.ReactNode
  showTakePhotoButton?: boolean
}

const RenderInput = React.forwardRef<TextInput, FormItemProps<any>>(
  (props, ref) => {
    const {
      fieldType,
      field,
      formContext,
      options,
      icon,
      iconSide,
      placeholder,
      error,
      disabled,
      toggleType = 'single',
      toggleOptions,
      displayVariant = 'default',
      mask,
      maskType,
      maskOptions,
      keyboardType,
      imagePreviewSize,
      onSubmitEditing,
      onValueSelect,
      documentPickerOptions,
      placeholderIcon,
      label,
      loading,
      showTakePhotoButton,
    } = props
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

    const debouncedValidation = useCallback(
      debounce(async (name: string) => {
        if (formContext && name) {
          await formContext.trigger(name)
        }
      }, 300),
      [formContext]
    )

    const handleChange = (value: string) => {
      field.onChange(value)
      if (formContext && field.name) {
        debouncedValidation(field.name)
      }
    }

    useEffect(() => {
      return () => {
        debouncedValidation.cancel()
      }
    }, [debouncedValidation])

    const handleEndEditing = async () => {
      if (formContext && field.name) {
        await formContext.trigger(field.name)
      }
    }

    switch (fieldType) {
      case 'textarea':
        return (
          <Input
            ref={ref}
            placeholder={placeholder}
            icon={icon}
            iconSide={iconSide}
            error={error}
            editable={!disabled}
            value={field.value}
            onChangeText={handleChange}
            onBlur={field.onBlur}
            onEndEditing={handleEndEditing}
            multiline
            numberOfLines={4}
          />
        )

      case 'input':
        return (
          <Input
            ref={ref}
            placeholder={placeholder}
            icon={icon}
            iconSide={iconSide}
            error={error}
            editable={!disabled}
            value={field.value}
            onChangeText={handleChange}
            onBlur={field.onBlur}
            onEndEditing={handleEndEditing}
            onSubmitEditing={onSubmitEditing}
            keyboardType={keyboardType}
          />
        )

      case 'masked-input':
        return (
          <MaskedInput
            ref={ref}
            placeholder={placeholder}
            icon={icon}
            iconSide={iconSide}
            error={error}
            editable={!disabled}
            value={field.value}
            onChangeText={handleChange}
            onBlur={field.onBlur}
            onEndEditing={handleEndEditing}
            mask={mask ?? ''}
            type={maskType}
            options={maskOptions}
            keyboardType={keyboardType}
            onSubmitEditing={onSubmitEditing}
          />
        )

      // [] Estudar uma possibilidade de fechar o select outSide
      case 'select':
        return (
          <SelectField
            field={field}
            options={options}
            placeholder={placeholder}
            error={error}
            disabled={disabled}
            loading={loading}
            onValueSelect={onValueSelect}
          />
        )

      case 'toggle-group':
        return (
          <ToggleGroup
            type={toggleType}
            value={field.value || ''}
            onValueChange={(value) => {
              field.onChange(value)
              onValueSelect?.()
            }}
            displayVariant={displayVariant}>
            {toggleOptions?.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                label={option.label}
                description={option.description ?? ''}
                icon={option.icon}
              />
            ))}
          </ToggleGroup>
        )

      case 'image-picker':
        return (
          <InputImagePicker
            value={field.value}
            label={label}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={error}
            disabled={disabled}
            previewSize={imagePreviewSize}
            placeholderIcon={placeholderIcon}
            showTakePhotoButton={showTakePhotoButton}
          />
        )

      case 'image-gallery-picker':
        return (
          <InputImageGalleryPicker
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={error}
            disabled={disabled}
            previewSize={imagePreviewSize}
            placeholderIcon={placeholderIcon}
            label={label}
          />
        )

      case 'birth-date':
        return (
          <View className="relative">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsDatePickerOpen(true)}>
              <Input
                pointerEvents="none"
                className="pointer-events-none"
                placeholder={placeholder}
                icon={icon}
                iconSide={iconSide}
                error={error}
                value={
                  field.value ? format(new Date(field.value), 'dd/MM') : ''
                }
              />
            </TouchableOpacity>
            <DatePicker
              value={field.value ? new Date(field.value) : undefined}
              onChange={(date) => {
                field.onChange(date.toISOString())
              }}
              isOpen={isDatePickerOpen}
              onClose={() => setIsDatePickerOpen(false)}
            />
          </View>
        )

      case 'document-picker':
        return (
          <DocumentPickerInput
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder={placeholder}
            icon={icon}
            iconSide={iconSide}
            error={error}
            disabled={disabled}
            options={documentPickerOptions}
          />
        )

      default:
        return null
    }
  }
)

export const FormItem = React.forwardRef<TextInput, FormItemProps<any>>(
  (props, ref) => {
    const { label, hideSupportiveText = false, className, fieldType } = props

    return (
      <OriginalFormItem
        className={cn('mb-4 w-full justify-start gap-2', className)}>
        {label &&
          fieldType !== 'image-gallery-picker' &&
          fieldType !== 'image-picker' && (
            <FormLabel className="leading-none">{label}</FormLabel>
          )}
        <RenderInput {...props} ref={ref} />
        {!hideSupportiveText && (
          <View className="mt-0 h-4">
            <FormMessage />
          </View>
        )}
      </OriginalFormItem>
    )
  }
)

FormItem.displayName = 'FormItem'
RenderInput.displayName = 'RenderInput'

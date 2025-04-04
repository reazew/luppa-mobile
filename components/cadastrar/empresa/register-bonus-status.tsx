import { zodResolver } from '@hookform/resolvers/zod'
import { DiamondIcon, GoldIcon, SilverIcon } from 'assets/icons'
import { Button } from 'components/global/button'
import { FormItem } from 'components/global/form-item'
import { Heading } from 'components/global/heading'
import { Form, FormField } from 'components/ui/form'
import { Separator } from 'components/ui/separator'
import { router } from 'expo-router'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react-native'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import {
  registerBonusStatusSchema,
  type RegisterBonusStatusInfer,
} from 'schemas/register-business'
import { useStepStore } from 'store/useStepStore'
import type { User } from 'types/user'

export const RegisterBonusStatus = (bonusStatusData: User) => {
  const form = useForm<RegisterBonusStatusInfer>({
    resolver: zodResolver(registerBonusStatusSchema),
    defaultValues: {
      status: {
        diamond: {
          minimumPoints: bonusStatusData?.status?.diamond?.minimumPoints,
          description: bonusStatusData?.status?.diamond?.description,
        },
        gold: {
          minimumPoints: bonusStatusData?.status?.gold?.minimumPoints,
          description: bonusStatusData?.status?.gold?.description,
        },
        silver: {
          minimumPoints: bonusStatusData?.status?.silver?.minimumPoints,
          description: bonusStatusData?.status?.silver?.description,
        },
      },
    },
  })

  const { setStep } = useStepStore()
  const [loading, setLoading] = useState(false)

  const handleBack = () => {
    router.back()
  }

  const onSubmit = form.handleSubmit(async (value) => {
    if (loading) return

    setLoading(true)
    try {
      console.log(value)
      router.navigate('/form-step-decrement-status')
      setStep(4)
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <Form {...form}>
      <View className="w-full flex-1 justify-start gap-8">
        <View className="w-full flex-1">
          <Heading
            className="mb-6"
            size="xl"
            icon={<DiamondIcon width={32} height={32} />}>
            Cliente Diamante
          </Heading>
          <FormField
            control={form.control}
            name="status.diamond.minimumPoints"
            render={({ field }) => (
              <FormItem
                field={field}
                fieldType="masked-input"
                keyboardType="numeric"
                mask="9999999999"
                label="Quantidade mínima de pontos"
                placeholder="0"
                formContext={form}
              />
            )}
          />
          <View className="w-full flex-1">
            <FormField
              control={form.control}
              name="status.diamond.description"
              render={({ field }) => (
                <FormItem
                  field={field}
                  fieldType="textarea"
                  label="Benefícios"
                  placeholder="Descreva os benefícios do status Diamante"
                  formContext={form}
                />
              )}
            />
          </View>
          <Separator />
        </View>
        <View className="w-full flex-1">
          <Heading
            className="mb-6"
            size="xl"
            icon={<GoldIcon width={32} height={32} />}>
            Cliente Ouro
          </Heading>
          <FormField
            control={form.control}
            name="status.gold.minimumPoints"
            render={({ field }) => (
              <FormItem
                field={field}
                fieldType="masked-input"
                keyboardType="numeric"
                mask="9999999999"
                label="Quantidade mínima de pontos"
                placeholder="0"
                formContext={form}
              />
            )}
          />
          <FormField
            control={form.control}
            name="status.gold.description"
            render={({ field }) => (
              <FormItem
                field={field}
                fieldType="textarea"
                label="Benefícios"
                placeholder="Descreva os benefícios do status Ouro"
                formContext={form}
              />
            )}
          />
          <Separator />
        </View>
        <View className="w-full flex-1">
          <Heading
            className="mb-6"
            size="xl"
            icon={<SilverIcon width={32} height={32} />}>
            Cliente Prata
          </Heading>
          <FormField
            control={form.control}
            name="status.silver.minimumPoints"
            render={({ field }) => (
              <FormItem
                field={field}
                fieldType="masked-input"
                keyboardType="numeric"
                mask="9999999999"
                label="Quantidade mínima de pontos"
                placeholder="0"
                formContext={form}
              />
            )}
          />
          <FormField
            control={form.control}
            name="status.silver.description"
            render={({ field }) => (
              <FormItem
                field={field}
                fieldType="textarea"
                label="Benefícios"
                placeholder="Descreva os benefícios do status Prata"
                formContext={form}
              />
            )}
          />
        </View>
      </View>
      <View className="flex w-full flex-row items-center justify-between gap-2">
        <Button
          variant="ghost"
          size="icon"
          onPress={handleBack}
          className="w-1/2 max-w-[189px]">
          <Button.Icon>
            <CircleArrowLeft size={16} />
          </Button.Icon>
          <Button.Text>Voltar</Button.Text>
        </Button>
        <Button
          onPress={onSubmit}
          className="w-1/2 max-w-[189px]"
          disabled={loading}>
          <Button.Text>{loading ? 'Enviando...' : 'Avançar'}</Button.Text>
          <Button.Icon>
            <CircleArrowRight size={16} />
          </Button.Icon>
        </Button>
      </View>
    </Form>
  )
}

import { zodResolver } from '@hookform/resolvers/zod'
import { DiamondIcon, GoldIcon, SilverIcon } from 'assets/icons'
import { Button } from 'components/global/button'
import { FormItem } from 'components/global/form-item'
import { Heading } from 'components/global/heading'
import { Form, FormField } from 'components/ui/form'
import { Separator } from 'components/ui/separator'
import { router } from 'expo-router'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react-native'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import {
  registerBonusStatusSchema,
  type RegisterBonusStatusInfer,
} from 'schemas/register-business'
import { useFormStore } from 'store/useFormStore'
import { useStepStore } from 'store/useStepStore'

const FORM_ID = 'register-bonus-status-form'

export const RegisterBonusStatus = () => {
  const { getForm, updateForm } = useFormStore()
  const { setStep } = useStepStore()

  const savedData = getForm(FORM_ID) || {}

  const form = useForm<RegisterBonusStatusInfer>({
    resolver: zodResolver(registerBonusStatusSchema),
    defaultValues: {
      status: {
        diamond: {
          minimumPoints: savedData.status?.diamond?.minimumPoints || '',
          description: savedData.status?.diamond?.description || '',
        },
        gold: {
          minimumPoints: savedData.status?.gold?.minimumPoints || '',
          description: savedData.status?.gold?.description || '',
        },
        silver: {
          minimumPoints: savedData.status?.silver?.minimumPoints || '',
          description: savedData.status?.silver?.description || '',
        },
      },
    },
  })

  const handleBack = () => {
    router.back()
  }

  const handleSubmit = form.handleSubmit((formData) => {
    updateForm(FORM_ID, {
      ...formData,
    })

    router.navigate('/form-step-decrement-status')
    setStep(4)
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
        <Button onPress={handleSubmit} className="w-1/2 max-w-[189px]">
          <Button.Text>Avançar</Button.Text>
          <Button.Icon>
            <CircleArrowRight size={16} />
          </Button.Icon>
        </Button>
      </View>
    </Form>
  )
}

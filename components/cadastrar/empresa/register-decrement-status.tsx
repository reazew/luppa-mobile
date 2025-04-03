import { zodResolver } from '@hookform/resolvers/zod'
import { DiamondIcon, GoldIcon, SilverIcon } from 'assets/icons'
import { Button } from 'components/global/button'
import { FormItem } from 'components/global/form-item'
import { Heading } from 'components/global/heading'
import { Form, FormField } from 'components/ui/form'
import { Separator } from 'components/ui/separator'
import { router } from 'expo-router'
import { CircleArrowRight, MoveLeft } from 'lucide-react-native'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import {
  registerDecrementStatusSchema,
  type RegisterDecrementStatusInfer,
} from 'schemas/register-business'
import { useStepStore } from 'store/useStepStore'
import type { User } from 'types/user'

export const RegisterDecrementStatus = (decrementStatusData: User) => {
  const form = useForm<RegisterDecrementStatusInfer>({
    resolver: zodResolver(registerDecrementStatusSchema),
    defaultValues: {
      status: {
        diamond: { decrementPoints: '', expirationTime: '' },
        gold: { decrementPoints: '', expirationTime: '' },
        silver: { decrementPoints: '', expirationTime: '' },
      },
    },
  })

  const { nextStep } = useStepStore()
  const handleBack = () => {
    router.back()
  }

  const onSubmit = form.handleSubmit((value) => {
    console.log(value)
    router.push('/form-step-receive-methods')
    nextStep()
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
            name="status.diamond.expirationTime"
            render={({ field }) => (
              <FormItem
                field={field}
                fieldType="select"
                label="Diminuir pontos desse nível a partir de"
                placeholder="Selecione o tempo de expiração"
                options={[
                  { label: '1 mês', value: '1' },
                  { label: '2 meses', value: '2' },
                  { label: '3 meses', value: '3' },
                  { label: '4 meses', value: '4' },
                  { label: '5 meses', value: '5' },
                  { label: '6 meses', value: '6' },
                ]}
                formContext={form}
              />
            )}
          />
          <FormField
            control={form.control}
            name="status.diamond.decrementPoints"
            render={({ field }) => (
              <FormItem
                field={field}
                fieldType="masked-input"
                keyboardType="numeric"
                mask="9999999999"
                label="Pontos perdidos"
                placeholder="0"
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
            icon={<GoldIcon width={32} height={32} />}>
            Cliente Ouro
          </Heading>
          <FormField
            control={form.control}
            name="status.gold.expirationTime"
            render={({ field }) => (
              <FormItem
                field={field}
                fieldType="select"
                label="Diminuir pontos desse nível a partir de"
                placeholder="Selecione o tempo de expiração"
                options={[
                  { label: '1 mês', value: '1' },
                  { label: '2 meses', value: '2' },
                  { label: '3 meses', value: '3' },
                  { label: '4 meses', value: '4' },
                  { label: '5 meses', value: '5' },
                  { label: '6 meses', value: '6' },
                ]}
                formContext={form}
              />
            )}
          />
          <FormField
            control={form.control}
            name="status.gold.decrementPoints"
            render={({ field }) => (
              <FormItem
                field={field}
                fieldType="masked-input"
                keyboardType="numeric"
                mask="9999999999"
                label="Pontos perdidos"
                placeholder="0"
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
            name="status.silver.expirationTime"
            render={({ field }) => (
              <FormItem
                field={field}
                fieldType="select"
                label="Diminuir pontos desse nível a partir de"
                placeholder="Selecione o tempo de expiração"
                options={[
                  { label: '1 mês', value: '1' },
                  { label: '2 meses', value: '2' },
                  { label: '3 meses', value: '3' },
                  { label: '4 meses', value: '4' },
                  { label: '5 meses', value: '5' },
                  { label: '6 meses', value: '6' },
                ]}
                formContext={form}
              />
            )}
          />
          <FormField
            control={form.control}
            name="status.silver.decrementPoints"
            render={({ field }) => (
              <FormItem
                field={field}
                fieldType="masked-input"
                keyboardType="numeric"
                mask="9999999999"
                label="Pontos perdidos"
                placeholder="0"
              />
            )}
          />
        </View>
      </View>
      <View className="flex w-full flex-row items-center justify-between gap-2">
        <Button variant="ghost" size="icon" onPress={handleBack}>
          <Button.Icon>
            <MoveLeft size={16} />
          </Button.Icon>
        </Button>
        <Button onPress={onSubmit} className="max-w-[200px]">
          <Button.Text>Avançar</Button.Text>
          <Button.Icon>
            <CircleArrowRight size={16} />
          </Button.Icon>
        </Button>
      </View>
    </Form>
  )
}

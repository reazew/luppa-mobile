import { DiamondIcon, GoldIcon, SilverIcon } from 'assets/icons'
import { Button } from 'components/global/button'
import { Container } from 'components/global/container'
import { FormItem } from 'components/global/form-item'
import { Heading } from 'components/global/heading'
import { KeyboardView } from 'components/global/keyboard-view'
import { MessageBubble } from 'components/global/message-bubble'
import { ScrollView } from 'components/global/scroll-view-container'
import { Text } from 'components/global/text'
import { Form, FormField } from 'components/ui/form'
import { Separator } from 'components/ui/separator'
import { router } from 'expo-router'
import { CircleArrowRight, MoveLeft } from 'lucide-react-native'
import { cssInterop } from 'nativewind'
import { useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { type RegisterBusinessStatusInfer } from 'schemas/register'
import { useStepStore } from 'store/useStepStore'

export default function FormStepBonusStatus() {
  const { nextStep } = useStepStore()
  const handleBack = () => {
    router.back()
  }

  const handleNext = () => {
    router.push('/form-step-decrement-status')
    nextStep()
  }

  const form = useFormContext<RegisterBusinessStatusInfer>()

  cssInterop(DiamondIcon, {
    className: 'style',
  })

  return (
    <KeyboardView>
      <ScrollView>
        <Container hasHeader className="items-center gap-8 px-6">
          <Heading>Bonificação</Heading>
          <MessageBubble>
            <Text size="sm" weight="regular">
              O seu cliente receberá 1 ponto a cada R$1,00 gasto em seu Negócio.
              Defina os benefícios para quando ele atingir o status de Diamante,
              Ouro e Prata.
            </Text>
          </MessageBubble>

          <Form {...form}>
            <View className="w-full flex-1 justify-start gap-8">
              <View className="w-full flex-1">
                <Heading
                  className="mb-6"
                  size="xl"
                  icon={
                    <DiamondIcon
                      width={32}
                      height={32}
                      className="text-blue-300"
                    />
                  }>
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
                  icon={
                    <GoldIcon
                      width={32}
                      height={32}
                      className="text-blue-300"
                    />
                  }>
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
                    />
                  )}
                />
                <Separator />
              </View>
              <View className="w-full flex-1">
                <Heading
                  className="mb-6"
                  size="xl"
                  icon={
                    <SilverIcon
                      width={32}
                      height={32}
                      className="text-blue-300"
                    />
                  }>
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
                    />
                  )}
                />
              </View>
            </View>
          </Form>
          <View className="flex w-full flex-row items-center justify-between gap-2">
            <Button variant="ghost" size="icon" onPress={handleBack}>
              <Button.Icon>
                <MoveLeft size={16} />
              </Button.Icon>
            </Button>
            <Button onPress={handleNext} className="max-w-[200px]">
              <Button.Text>Avançar</Button.Text>
              <Button.Icon>
                <CircleArrowRight size={16} />
              </Button.Icon>
            </Button>
          </View>
        </Container>
      </ScrollView>
    </KeyboardView>
  )
}

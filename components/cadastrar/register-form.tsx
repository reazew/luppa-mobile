import { zodResolver } from '@hookform/resolvers/zod'
import { BasicInformationStep } from 'components/cadastrar/basic-information-step'
import { ClientOrCompany } from 'components/cadastrar/client-or-company-step'
import { PaymentMethodsStep } from 'components/cadastrar/payment-methods-step'
import { RegistrationCompleted } from 'components/cadastrar/registration-completed-step'
import { Form } from 'components/ui/form'
import { bottomBarHeight, statusBarHeight } from 'lib/util'
import { isUndefined } from 'lodash'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Platform, ScrollView, View } from 'react-native'
import { RegisterInfer, registerSchema } from 'schemas/register'

export const RegisterForm = () => {
  const [stepForm, setStepForm] = useState<
    'clientOrCompany' | 'basicInformation' | 'paymentMethods' | 'registrationCompleted'
  >('clientOrCompany')

  const steps = ['clientOrCompany', 'basicInformation', 'paymentMethods', 'registrationCompleted']
  const currentStepIndex = steps.indexOf(stepForm)

  // const userData = MOCKED_USERS[0]

  const form = useForm<RegisterInfer>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      type: '',
      phone: '',
      city: '',
      uf: '',
      birthDate: '',
      imageFile: !isUndefined('') ? [new File([], '')] : null,
    },
  })

  return (
    <Form {...form}>
      <ScrollView
        className="bg-background"
        alwaysBounceVertical={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            paddingTop: statusBarHeight,
            paddingBottom: Platform.OS === 'ios' ? bottomBarHeight + 32 : bottomBarHeight + 10,
          }}
          className="flex-1">
          <View className="flex-row justify-center gap-2 px-6 py-8">
            {steps.map((_, index) => (
              <View
                key={index}
                className={`h-[8px] flex-1 rounded-full ${index <= currentStepIndex ? 'bg-yellow-300' : 'bg-black-500'}`}
              />
            ))}
          </View>
          {stepForm === 'clientOrCompany' && <ClientOrCompany form={form} setStepForm={setStepForm} />}
          {stepForm === 'basicInformation' && <BasicInformationStep form={form} setStepForm={setStepForm} />}
          {stepForm === 'paymentMethods' && <PaymentMethodsStep form={form} setStepForm={setStepForm} />}
          {stepForm === 'registrationCompleted' && <RegistrationCompleted form={form} setStepForm={setStepForm} />}
        </View>
      </ScrollView>
    </Form>
  )
}

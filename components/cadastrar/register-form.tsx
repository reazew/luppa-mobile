import { BasicInformationStep } from 'components/cadastrar/basic-information-step'
import { ClientOrCompany } from 'components/cadastrar/client-or-company-step'
import { PaymentMethodsStep } from 'components/cadastrar/payment-methods-step'
import { RegistrationCompleted } from 'components/cadastrar/registration-completed-step'
import { bottomBarHeight, statusBarHeight } from 'lib/util'
import { useState } from 'react'
import { Platform, ScrollView, View } from 'react-native'

export const RegisterForm = () => {
  const [stepForm, setStepForm] = useState<
    'clientOrCompany' | 'basicInformation' | 'paymentMethods' | 'registrationCompleted'
  >('clientOrCompany')

  const steps = ['clientOrCompany', 'basicInformation', 'paymentMethods', 'registrationCompleted']
  const currentStepIndex = steps.indexOf(stepForm)

  return (
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
              className={`h-[8px] flex-1 rounded-full ${
                index <= currentStepIndex ? 'bg-yellow-300' : 'bg-black-500'
              }`}
            />
          ))}
        </View>
        {stepForm === 'clientOrCompany' && <ClientOrCompany setStepForm={setStepForm} />}
        {stepForm === 'basicInformation' && <BasicInformationStep setStepForm={setStepForm} />}
        {stepForm === 'paymentMethods' && <PaymentMethodsStep setStepForm={setStepForm} />}
        {stepForm === 'registrationCompleted' && (
          <RegistrationCompleted setStepForm={setStepForm} />
        )}
      </View>
    </ScrollView>
  )
}

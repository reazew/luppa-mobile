import { BasicInformationStep } from 'components/cadastrar/basic-information-step'
import { ClientOrCompany } from 'components/cadastrar/client-or-company-step'
import { PaymentMethodsStep } from 'components/cadastrar/payment-methods-step'
import { RegistrationCompleted } from 'components/cadastrar/registration-completed-step'
import { useState } from 'react'
import { View } from 'react-native'

export default function Register() {
  const [stepForm, setStepForm] = useState<
    'clientOrCompany' | 'basicInformation' | 'paymentMethods' | 'registrationCompleted'
  >('clientOrCompany')

  return (
    <View className="flex-1 bg-black-600">
      {stepForm === 'clientOrCompany' && <ClientOrCompany />}
      {stepForm === 'basicInformation' && <BasicInformationStep />}
      {stepForm === 'paymentMethods' && <PaymentMethodsStep />}
      {stepForm === 'registrationCompleted' && <RegistrationCompleted />}
    </View>
  )
}

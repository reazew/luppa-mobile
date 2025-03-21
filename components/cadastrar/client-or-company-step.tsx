import { Button } from 'components/global/button'
import { Text } from 'components/global/text'
import { ToggleGroup, ToggleGroupItem } from 'components/ui/toggle-group'
import { CircleArrowRight } from 'lucide-react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { View } from 'react-native'

interface ClientOrCompanyProps {
  setStepForm: Dispatch<
    SetStateAction<
      'clientOrCompany' | 'basicInformation' | 'paymentMethods' | 'registrationCompleted'
    >
  >
}

export const ClientOrCompany = ({ setStepForm }: ClientOrCompanyProps) => {
  const [value, setValue] = React.useState('a')

  return (
    <View
      style={{
        flex: 1,
      }}
      className="flex-1 items-center justify-between gap-8 px-6">
      <Text size="huge-2" weight="bold" className="w-full text-left">
        Nos conte sobre você
      </Text>
      <View className="w-full flex-1 gap-8">
        <ToggleGroup type="single" value={value} onValueChange={setValue}>
          <ToggleGroupItem
            value="client"
            label="Sou cliente"
            variant="client"
            description="Quero ter acesso a uma rede de serviços e benefícios exclusivos."
          />
          <ToggleGroupItem
            value="company"
            label="Sou empresa"
            variant="company"
            description="Quero uma plataforma segura e confiável para facilitar e impulsionar negócios"
          />
        </ToggleGroup>
        <Button onPress={() => setStepForm('basicInformation')} className="mx-auto max-w-[200px]">
          <Button.Text>Avançar</Button.Text>
          <Button.Icon>
            <CircleArrowRight size={16} />
          </Button.Icon>
        </Button>
      </View>
    </View>
  )
}

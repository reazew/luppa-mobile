import { ShopIcon, VerifiedCheckIcon, WalletIcon } from 'assets/images/svg'
import { Button } from 'components/global/button'
import { Text } from 'components/global/text'
import { router } from 'expo-router'
import { cn } from 'lib/util'
import { CircleArrowRight } from 'lucide-react-native'
import { useCallback, useRef, useState } from 'react'
import { ImageBackground, Platform, View, useWindowDimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

export default function Onboarding() {
  const { width, height } = useWindowDimensions()
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<any>(null)

  const goToNextSlide = useCallback(() => {
    if (activeIndex < slides.length - 1) {
      carouselRef.current?.next()
      setActiveIndex(activeIndex + 1)
    }
  }, [activeIndex])

  const goToSlide = useCallback((index: number) => {
    carouselRef.current?.scrollTo({ index })
    setActiveIndex(index)
  }, [])

  const slides = [
    {
      component: FreeRegistrationStep,
    },
    {
      component: ImmediateAccessStep,
    },
    {
      component: SecurePlatformStep,
    },
  ]

  const renderItem = useCallback(
    ({ item }: { item: (typeof slides)[0]; index: number }) => {
      const Component = item.component
      return <Component setStepOnboarding={goToNextSlide} />
    },
    [goToNextSlide]
  )

  return (
    <View className="flex-1 bg-black-600">
      <Carousel
        ref={carouselRef}
        loop={false}
        width={width}
        height={height}
        data={slides}
        renderItem={renderItem}
        onSnapToItem={setActiveIndex}
        defaultIndex={activeIndex}
        enabled={false}
      />
      <View className={cn('absolute bottom-20 w-full', Platform.OS === 'ios' ? `pb-20` : `pb-14`)}>
        <View className="flex-row justify-center gap-4">
          {slides.map((_, index) => (
            <View
              key={index}
              className={cn(
                'h-[12px] w-[12px] rounded-full',
                activeIndex === index ? 'bg-yellow-300' : 'bg-black-500'
              )}
              onTouchEnd={() => goToSlide(index)}
            />
          ))}
        </View>
      </View>
    </View>
  )
}

export const FreeRegistrationStep = ({ setStepOnboarding }: { setStepOnboarding: () => void }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/login-step-1.png')}
      resizeMode="cover"
      className="flex-1 px-8">
      <View
        className={cn(
          'flex-1 items-center justify-center gap-10 pt-10',
          Platform.OS === 'ios' ? `pb-20` : `pb-20`
        )}>
        <View className="mb-10 w-full max-w-[364px] flex-1 items-start justify-end gap-6">
          <WalletIcon width={64} height={64} />
          <Text size="huge-2" weight="regular" className="mt-2">
            Cadastro 100% gratuito: sem taxas ocultas, sem compromisso
          </Text>
        </View>
        <View className="w-full items-center justify-center gap-4">
          <Button onPress={setStepOnboarding} className="max-w-[200px]">
            <Button.Text>Avançar</Button.Text>
            <Button.Icon>
              <CircleArrowRight size={16} />
            </Button.Icon>
          </Button>
        </View>
      </View>
    </ImageBackground>
  )
}

export const ImmediateAccessStep = ({ setStepOnboarding }: { setStepOnboarding: () => void }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/login-step-2.png')}
      resizeMode="cover"
      className="flex-1 px-8">
      <View
        className={cn(
          'flex-1 items-center justify-center gap-10 pt-10',
          Platform.OS === 'ios' ? `pb-20` : `pb-20`
        )}>
        <View className="mb-10 w-full max-w-[364px] flex-1 items-start justify-end gap-6">
          <ShopIcon width={64} height={64} />
          <Text size="huge-2" weight="regular" className="mt-2">
            Acesso imediato a uma rede de serviços e benefícios exclusivos
          </Text>
        </View>
        <View className="w-full items-center justify-center gap-4">
          <Button onPress={setStepOnboarding} className="max-w-[200px]">
            <Button.Text>Avançar</Button.Text>
            <Button.Icon>
              <CircleArrowRight size={16} />
            </Button.Icon>
          </Button>
        </View>
      </View>
    </ImageBackground>
  )
}

export const SecurePlatformStep = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/login-step-3.png')}
      resizeMode="cover"
      className="flex-1 px-8">
      <View
        className={cn(
          'flex-1 items-center justify-center gap-10 pt-10',
          Platform.OS === 'ios' ? `pb-20` : `pb-20`
        )}>
        <View className="mb-10 w-full max-w-[364px] flex-1 items-start justify-end gap-6">
          <VerifiedCheckIcon width={64} height={64} />
          <Text size="huge-2" weight="regular" className="mt-2">
            Plataforma segura em parceria com os maiores bancos e meios de pagamento do país
          </Text>
        </View>
        <View className="w-full items-center justify-center gap-4">
          <Button onPress={() => router.push('/(public)/cadastrar')} className="max-w-[200px]">
            <Button.Text>Cadastrar</Button.Text>
          </Button>
        </View>
      </View>
    </ImageBackground>
  )
}

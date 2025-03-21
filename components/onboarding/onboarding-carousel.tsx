import { FreeRegistrationStep } from 'components/onboarding/free-registration-step'
import { ImmediateAccessStep } from 'components/onboarding/immediate-access-step'
import { SecurePlatformStep } from 'components/onboarding/secure-platform-step'
import { bottomBarHeight, cn } from 'lib/util'
import { useCallback, useRef, useState } from 'react'
import { Platform, View, useWindowDimensions } from 'react-native'
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
    <View
      className={cn(
        'flex-1 bg-background',
        Platform.OS === 'ios' ? `pb-[${bottomBarHeight + 32}px]` : `pb-8`
      )}>
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
      <View
        className={cn(
          'absolute bottom-20 w-full',
          Platform.OS === 'ios' ? `pb-[${bottomBarHeight + 32}px]` : `pb-[42px]`
        )}>
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

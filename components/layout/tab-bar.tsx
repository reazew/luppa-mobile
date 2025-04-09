import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { PlatformPressable } from '@react-navigation/elements'
import { useLinkBuilder } from '@react-navigation/native'
import { EllipseActiveIcon } from 'assets/icons'
import { BUSINESS_TABS, CLIENT_TABS } from 'lib/config/routes'
import { useState } from 'react'
import { Platform, View, type LayoutChangeEvent } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated'

export const TabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const { buildHref } = useLinkBuilder()

  const routes = state.routes[0].name.includes('campanhas')
    ? BUSINESS_TABS
    : CLIENT_TABS

  const [dimensions, setDimensions] = useState({
    width: 100,
    height: 6,
  })

  const buttonWidth = dimensions.width / state.routes.length

  const onTabBarLayout = (event: LayoutChangeEvent) => {
    setDimensions({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    })
  }

  const tabPositionX = useDerivedValue(() => {
    return buttonWidth * state.index
  })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(tabPositionX.value, {
          damping: 15,
          stiffness: 100,
        }),
      },
    ],
  }))

  return (
    <View
      onLayout={onTabBarLayout}
      className="absolute bottom-0 w-full flex-row items-start justify-between bg-background"
      style={{
        paddingBottom: Platform.OS === 'ios' ? 10 : 0,
      }}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            height: 6,
            width: buttonWidth,
            borderRadius: 20,
            bottom: 24,
          },
          animatedStyle,
        ]}>
        <View className="w-full flex-row items-center justify-center">
          <EllipseActiveIcon />
        </View>
      </Animated.View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const routeConfig = routes.find((r) => r.name === route.name)

        if (!routeConfig) return null

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        const Icon = isFocused ? routeConfig.activeIcon : routeConfig.icon

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center justify-center">
            <View className="h-[75px] flex-col items-center justify-center pb-3">
              {isFocused ? (
                <Icon />
              ) : (
                <Icon color="#B0B0B0" className="flex-1" />
              )}
            </View>
          </PlatformPressable>
        )
      })}
    </View>
  )
}

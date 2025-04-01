import { bottomBarHeight, cn, statusBarHeight } from 'lib/util'
import { ImageBackground, ImageSourcePropType, Platform } from 'react-native'

interface ContainerBackgroundProps {
  children: React.ReactNode
  className?: string
  hasHeader?: boolean
  source?: ImageSourcePropType
  imageClassName?: string
}

export const ContainerBackground = ({
  children,
  source = require('../../assets/images/home-background.png'),
  className,
}: ContainerBackgroundProps) => {
  return (
    <ImageBackground
      source={source}
      style={{
        flex: 1,
        paddingTop: statusBarHeight,
        paddingBottom:
          Platform.OS === 'ios' ? bottomBarHeight + 32 : bottomBarHeight + 10,
      }}
      className={cn(className)}
      resizeMode="cover">
      {children}
    </ImageBackground>
  )
}

const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config')

// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname)

// Configure SVG transformer
config.transformer.babelTransformerPath = require.resolve(
  'react-native-svg-transformer'
)
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== 'svg'
)
config.resolver.sourceExts.push('svg')

// Apply both NativeWind and Reanimated configurations
module.exports = wrapWithReanimatedMetroConfig(
  withNativeWind(config, { input: './styles/global.css' })
)

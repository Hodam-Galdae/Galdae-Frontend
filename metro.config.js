const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    // SVG 파일을 처리하기 위한 babelTransformerPath 설정
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    // 기본 assetExts에서 'svg' 확장자를 제거합니다.
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    // 기본 sourceExts에 'svg'를 추가합니다.
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);

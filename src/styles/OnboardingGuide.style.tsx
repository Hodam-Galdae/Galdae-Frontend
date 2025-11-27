import { StyleSheet, Dimensions } from 'react-native';
import { theme } from './theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 기준 화면 크기
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// 스케일 계산 함수
const scaleWidth = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;
const scaleHeight = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;
const scaleFontSize = (size: number) => Math.round((SCREEN_WIDTH / BASE_WIDTH) * size);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grayV3,
  },
  topContainer: {
    paddingTop: scaleHeight(88),
  },
  page: {
    flex: 1,
    width: SCREEN_WIDTH,
    paddingHorizontal: scaleWidth(24) ,
    paddingTop: scaleHeight(56),
  },
  titleContainer: {
    marginBottom: scaleHeight(48),
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingHorizontal: scaleWidth(24),
  },
  onboardingImage: {
    marginBottom: -scaleWidth(48),

  },
  pageTitle: {
    fontSize: scaleFontSize(20),
    fontWeight: '500',
    color: theme.colors.blackV1,
    textAlign: 'center',
    lineHeight: scaleFontSize(30),
  },
  pageTitleBold: {
    fontSize: scaleFontSize(24),
    fontWeight: '700',
    lineHeight: scaleFontSize(36),
  },
  categoryContainer: {
    width: '100%',
    gap: scaleHeight(64),
    paddingHorizontal: scaleWidth(32),
    paddingTop: scaleHeight(32),
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 0,
    gap: 12,
  },
  categoryCardReverse: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 0,
    gap: 12,
    alignSelf: 'flex-end',
  },
  speechBubbleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  triangleLeft: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 0,
    borderRightWidth: 12,
    borderBottomWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: theme.colors.blue2,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginRight: -1,
  },
  triangleRight: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 12,
    borderRightWidth: 0,
    borderBottomWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: theme.colors.blue2,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginLeft: -1,
  },
  speechBubble: {
    backgroundColor: theme.colors.blue2,
    borderRadius: 12,
    paddingTop: 12,
    paddingRight: 14,
    paddingBottom: 12,
    paddingLeft: 14,
    gap: 10,
    flex: 1,
  },
  categoryText: {
    fontSize: scaleFontSize(14),
    fontWeight: '400',
    color: theme.colors.blackV0,
    lineHeight: scaleFontSize(16),
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  bottomContainer: {
    paddingHorizontal: scaleWidth(24),
    paddingBottom: scaleHeight(48),
    backgroundColor: 'transparent',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: theme.colors.grayV1,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.Galdae,
  },
  skipButton: {
    width: '100%',
    backgroundColor: theme.colors.Galdae,
    borderRadius: 30,
    height: scaleHeight(48),
  },
  skipButtonText: {
    fontSize: scaleFontSize(16),
    fontWeight: '600',
    color: theme.colors.white,
  },
});

export default styles;

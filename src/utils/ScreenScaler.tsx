import { Dimensions} from 'react-native';

//화면 전체 사이즈 가져옴
const  { width, height } = Dimensions.get('window');

//기준이 되는 가로
const guidelineBaseWidth = 375;

//기준이 되는 세로
const guidelineBaseHeight = 872;

// 뷰포트기반
const scale = (size : number) => width / guidelineBaseWidth * size;

// 높이기반
const verticalScale = (size : number) => height / guidelineBaseHeight * size;

// factor값 제어
const moderateScale = (size : number, factor = 1.0) => size + ( scale(size) - size ) * factor;

export {scale, verticalScale, moderateScale};

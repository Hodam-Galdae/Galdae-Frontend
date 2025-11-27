import { StyleSheet } from 'react-native';
import { theme } from './theme';
//import { theme } from './theme';
const DEFAULT_ITEM_HEIGHT = 52;
export default StyleSheet.create({
  container: {
    width: '100%',
    height: DEFAULT_ITEM_HEIGHT * 5, // 위/아래 패딩 생각해서 5행 높이 확보
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  column: {
    flex: 1,
  },
  item: {
    height: DEFAULT_ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 18,
    color: theme.colors.blackV3,
    fontWeight: '500',
  },
  itemTextSelected: {
    fontSize: 20,
    fontWeight: '500',
    color:theme.colors.blue,
  },
  centerOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: (DEFAULT_ITEM_HEIGHT * 5 - DEFAULT_ITEM_HEIGHT) / 2, // 중앙 행 위치
    justifyContent: 'center',
  },
  centerBorder: {
    height: DEFAULT_ITEM_HEIGHT,
    backgroundColor: theme.colors.grayV3,
    borderRadius: theme.borderRadius.size12,
  },
});

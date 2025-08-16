import {StyleSheet, Dimensions} from 'react-native';
import {theme} from './theme';

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  background: {
    backgroundColor: theme.colors.popupBackGround,
  },
  container: {
    shadowColor: 'rgba(156, 156, 156, 10)',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleContainer: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 33,
  },
  handle: {
    width: 68,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: theme.colors.grayV0,
  },
  content: {},
  settlementLastText: {
    fontSize: theme.fontSize.size14,
    fontWeight: '500',
    color: theme.colors.blackV0,
  },
  settlementCloseBtn: {
    width: 30,
    height: 30,
    backgroundColor: theme.colors.Galdae2,
    position: 'absolute',
    borderRadius: 999,
    right: 15,
    top: 15,
    zIndex: 999,
  },
  bankContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: theme.colors.grayV3,
    paddingVertical: 10,
    borderRadius: 10,
  },
  bankIcon: {
    width: 26,
    height: 26,
    marginRight: 6,
  },
  bankText: {
    fontSize: theme.fontSize.size14,
    fontWeight: '400',
    color: theme.colors.blackV0,
  },
  bankEdit: {
    color: theme.colors.grayV2,
    fontSize: theme.fontSize.size12,
    fontWeight: '400',
    marginTop: 4,
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
  },
  settlementLastTextContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  settlementContainer: {
    paddingHorizontal: 15,
    backgroundColor: theme.colors.white,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  settlementCostContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  settlementBtnText: {
    fontSize: theme.fontSize.size16,
    fontWeight: '700',
    color: theme.colors.white,
  },
  settlementTitle: {
    fontSize: theme.fontSize.size20,
    color: theme.colors.blackV0,
    fontWeight: '700',
    paddingLeft: 10,
    marginTop: 20,
    width: 100,
  },
  settlementTime: {
    paddingLeft: 10,
    fontSize: theme.fontSize.size12,
    color: theme.colors.grayV1,
    fontWeight: '500',
    marginTop: 8,
  },
  settlementLoactionContainer: {
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 4,
  },
  settlementLocationIcon: {
    marginRight: 4,
  },
  settlementLastCostContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 15,
  },
  settlementLastCostBox: {
    paddingTop: 15,
    backgroundColor: theme.colors.grayV3,
    height: 128,
    borderRadius: 10,
    width: (width - 37) / 2,
  },
  settlementLocationText: {
    fontSize: theme.fontSize.size16,
    fontWeight: '700',
    color: theme.colors.blackV0,
  },
  settlementBtn: {
    backgroundColor: theme.colors.Galdae,
    paddingVertical: 10,
    marginTop: 11,
  },
  settlementCostText: {
    color: theme.colors.blackV0,
    fontSize: theme.fontSize.size20,
    fontWeight: '700',
  },
  settlementCostTextContainer: {
    alignItems: 'flex-end',
  },
  settlementCostEditText: {
    color: theme.colors.grayV2,
    fontSize: theme.fontSize.size12,
    fontWeight: '400',
    textDecorationLine: 'underline',
    marginTop: 4,
  },
});

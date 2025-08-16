import {StyleSheet, Dimensions} from 'react-native';
import {theme} from './theme';

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerIcon: {
    marginRight: 4,
  },
  headerText: {
    marginRight: 4,
    color: theme.colors.blackV0,
    fontSize: theme.fontSize.size22,
    fontWeight: '700',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: theme.colors.grayV3,
    justifyContent: 'space-between',
  },
  list: {
    flex: 1,
    paddingLeft: 15,
  },
  addBtn: {
    width: 30,
    height: 30,
    backgroundColor: theme.colors.Galdae2,
    marginRight: 10,
    borderRadius: 999,
  },
  sendBtn: {
    width: 34,
    height: 34,
    backgroundColor: theme.colors.Galdae,
    marginLeft: 12,
    borderRadius: 999,
  },
  inputBox: {
    flex: 1,
    height: 'auto',
    flexWrap: 'wrap',
    borderRadius: 10,
    backgroundColor: '#E9E9E9',
    fontSize: theme.fontSize.size14,
    fontWeight: '500',
    color: theme.colors.blackV0,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    width: '100%',
    padding: 15,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  extraView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.white,
  },
  extraViewContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    marginRight: 12,
  },
  extraViewItem: {
    borderRadius: 999,
    width: 70,
    height: 70,
    backgroundColor: theme.colors.grayV3,
  },
  extraViewItemIcon: {
    width: 28,
    height: 28,
  },
  extraViewItemText: {
    marginTop: 6,
    fontSize: 14,
    color: theme.colors.grayV2,
    fontWeight: '500',
  },
  inputWrapper: {
    width: '100%',
  },
  sideMenu: {
    backgroundColor: theme.colors.white,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
    justifyContent: 'space-between',
    zIndex: 999,
  },
  menuUserList: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  menuText: {
    color: theme.colors.blackV0,
    fontSize: theme.fontSize.size20,
    fontWeight: '700',
    marginTop: 57,
    marginBottom: 36,
    paddingLeft: 20,
  },
  menuUserIcon: {
    marginRight: 15,
  },
  menuUserText: {
    fontSize: theme.fontSize.size18,
    fontWeight: '500',
    color: theme.colors.blackV0,
    marginRight: 10,
  },
  menuUserMe: {
    backgroundColor: theme.colors.Galdae2,
    width: 18,
    height: 18,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuUserMeText: {
    color: theme.colors.Galdae,
    fontSize: theme.fontSize.size12,
    fontWeight: '700',
  },
  menuUserWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  menuUserContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  menuUserBtn: {
    backgroundColor: theme.colors.Galdae,
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 10,
  },
  menuUserBtnText: {
    fontSize: theme.fontSize.size14,
    fontWeight: '500',
    color: theme.colors.white,
  },
  exitIcon: {
    position: 'absolute',
    right: 20,
    bottom: 30,
  },
});

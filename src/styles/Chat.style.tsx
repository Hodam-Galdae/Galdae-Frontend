import {StyleSheet} from 'react-native';
import {theme} from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  noData: {
    height: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  sectionHeader: {
    paddingVertical: 10,
    backgroundColor: theme.colors.white,
  },
  sectionTitle: {
    fontSize: theme.fontSize.size18,
    fontWeight: '700',
    color: theme.colors.blackV0,
  },
  authRequiredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  needInfoIcon: {
    marginBottom: 20,
  },
  authRequiredText: {
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: -0.28, // -2%
    marginBottom: 30,
  },
  authRequiredButton: {
    height: 29,
    borderRadius: 50,
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  authRequiredButtonText: {
    fontSize: theme.fontSize.size14,
    fontWeight: '500',
  },
});

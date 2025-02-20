
import { StyleSheet } from 'react-native';
import { theme } from './theme';


export default StyleSheet.create({
    main:{
        height:'100%',
    },
    headerText:{
        fontSize: theme.fontSize.size22,
        fontWeight: 'bold',
    },
    content: {
        padding: 16,
      },
    ownerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: theme.colors.brandColor,
      },
      detailText: {
        fontSize: 16,
        marginBottom: 4,
        color: theme.colors.gray1,
      },
      tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
      },
      tagText: {
        fontSize: 14,
        color: theme.colors.white,
        backgroundColor: theme.colors.brandColor,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 4,
        marginBottom: 4,
      },
});

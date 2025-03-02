// GaldaeItem.tsx
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import BasicText from '../components/BasicText';
import SVG from '../components/SVG';
import TextTag from '../components/tag/TextTag';
import { theme } from '../styles/theme';
import styles from '../styles/GaldaeItem.style';

interface GaldaeItemProps {
  item: any;
  onPress: () => void;
  onLongPress?: () => void;
}

const GaldaeItem: React.FC<GaldaeItemProps> = ({ item, onPress,onLongPress }) => {
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.borderedListBox}>
        <BasicText text={item.owner} style={styles.galdaeOwner} />
        <View style={styles.fromContainer}>
          <SVG name="Car" />
          <BasicText text={item.from.sub} style={styles.fromMainLocation} />
          <BasicText text={item.from.main} style={styles.fromSubLocation} />
        </View>
        <View style={styles.toContainer}>
          <View style={styles.fromToLine}>
            <SVG name="FromToLine" />
          </View>
          {Array(item.users)
            .fill(null)
            .map((_, idx) => (
              <SVG key={`user-${item.id}-${idx}`} name="User" />
            ))}
          {Array(item.capacity - item.users)
            .fill(null)
            .map((_, idx) => (
              <SVG key={`disabled-${item.id}-${idx}`} name="DisabledUser" />
            ))}
          <BasicText
            text={`(${item.users}/${item.capacity})`}
            fontWeight={500}
            fontSize={theme.fontSize.size16}
            color={theme.colors.gray1}
          />
        </View>
        <View style={styles.toContainer}>
          <SVG name="Location" />
          <BasicText text={item.destination.sub} style={styles.fromMainLocation} />
          <BasicText text={item.destination.main} style={styles.fromSubLocation} />
        </View>
        <View style={styles.timeContainer}>
          <SVG name="Clock" />
          <View>
            <BasicText
              text={item.timeAgreement ? '시간 협의가능' : '시간 협의불가'}
              style={styles.fromMainLocation}
              color={theme.colors.gray2}
              fontSize={theme.fontSize.size10}
            />
            <BasicText
              text={item.time}
              style={styles.fromSubLocation}
              color={theme.colors.black}
              fontSize={theme.fontSize.size14}
            />
          </View>
        </View>
        <View style={styles.tags}>
          {item.tags.map((tag: string, index: number) => (
            <TextTag key={index} text={tag} />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GaldaeItem;

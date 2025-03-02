// FrequentRouteItem.tsx
import React from 'react';
import { View } from 'react-native';
import BasicText from '../components/BasicText';
import TextTag from '../components/tag/TextTag';
import SVG from '../components/SVG';
import styles from '../styles/FrequentRouteItem.style'; // 또는 실제 필요한 스타일 파일
import { theme } from '../styles/theme';

// 자주 가는 경로(Frequent Route) 항목 구조
export interface FrequentRoute {
  id: number;
  date: string;
  start: {
    label: string;
    main: string;
    sub: string;
  };
  end: {
    label: string;
    main: string;
    sub: string;
  };
}

interface FrequentRouteItemProps {
  routeData: FrequentRoute;
}

const FrequentRouteItem: React.FC<FrequentRouteItemProps> = ({ routeData }) => {
  return (
    <View style={styles.searchListBox}>
      <View style={styles.startContain}>
        <TextTag
          text={routeData.start.label}
          viewStyle={styles.start}
          enabledColors={{
            backgroundColor: theme.colors.white,
            textColor: theme.colors.brandColor,
            borderColor: theme.colors.brandColor,
          }}
        />
        <BasicText text={routeData.start.main} style={styles.mainPosName} />
        <BasicText text={routeData.start.sub} style={styles.subPosName} />
      </View>

      <SVG name="arrow_right_line" width={22} height={22} style={styles.arrowRight} />

      <View style={styles.startContain}>
        <TextTag
          text={routeData.end.label}
          viewStyle={styles.start}
          enabledColors={{
            backgroundColor: theme.colors.white,
            textColor: theme.colors.brandColor,
            borderColor: theme.colors.brandColor,
          }}
        />
        <BasicText text={routeData.end.main} style={styles.mainPosName} />
        <BasicText text={routeData.end.sub} style={styles.subPosName} />
      </View>
    </View>
  );
};

export default FrequentRouteItem;

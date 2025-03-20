// FrequentRouteItem.tsx
import React from 'react';
import { View } from 'react-native';
import BasicText from '../components/BasicText';
import TextTag from '../components/tag/TextTag';
import SVG from '../components/SVG';
import styles from '../styles/FrequentRouteItem.style'; // 실제 필요한 스타일 파일
import { theme } from '../styles/theme';

// 실제 데이터 구조에 맞춘 인터페이스
export interface FrequentRoute {
  departure: {
    majorPlace: string;
    subPlace: string;
  };
  arrival: {
    majorPlace: string;
    subPlace: string;
  };
  createdAt: string;
}

interface FrequentRouteItemProps {
  routeData: FrequentRoute;
}

const FrequentRouteItem: React.FC<FrequentRouteItemProps> = ({ routeData }) => {

  return (
    <View style={styles.searchListBox}>
      <View style={styles.startContain}>
        <TextTag
          text="출발지"
          viewStyle={styles.start}
          enabledColors={{
            backgroundColor: theme.colors.white,
            textColor: theme.colors.brandColor,
            borderColor: theme.colors.brandColor,
          }}
        />
        <BasicText text={routeData.departure.majorPlace} style={styles.mainPosName} />
        <BasicText text={routeData.departure.subPlace} style={styles.subPosName} />
      </View>

      <SVG name="arrow_right_line" width={22} height={22} style={styles.arrowRight} />

      <View style={styles.startContain}>
        <TextTag
          text="도착지"
          viewStyle={styles.start}
          enabledColors={{
            backgroundColor: theme.colors.white,
            textColor: theme.colors.brandColor,
            borderColor: theme.colors.brandColor,
          }}
        />
        <BasicText text={routeData.arrival.majorPlace} style={styles.mainPosName} />
        <BasicText text={routeData.arrival.subPlace} style={styles.subPosName} />
      </View>

    </View>
  );
};

export default FrequentRouteItem;

// NowGaldaeDetail.tsx
import React from 'react';
import { View } from 'react-native';
import BasicText from '../components/BasicText';
import SVGButton from '../components/button/SVGButton';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Header from '../components/Header';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../styles/NowGaldaeDetail.style';

// 내비게이션 스택 타입 정의 (이전과 동일)
type RootStackParamList = {
  CreateGaldae: undefined;
  NowGaldae: undefined;
  NowGaldaeDetail: { item: any };
};

type NowGaldaeDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NowGaldaeDetail'>;
type NowGaldaeDetailRouteProp = RouteProp<RootStackParamList, 'NowGaldaeDetail'>;

const NowGaldaeDetail: React.FC = () => {
  const navigation = useNavigation<NowGaldaeDetailScreenNavigationProp>();
  const route = useRoute<NowGaldaeDetailRouteProp>();
  const { item } = route.params; // 전달받은 데이터

  const goBack = () => navigation.goBack();

  return (
    <View style={styles.main}>
      <Header
        leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack} />}
        title={<BasicText text="갈대 상세 정보" style={styles.headerText} />}
      />
      <View style={styles.content}>
        <BasicText text={item.owner} style={styles.ownerText} />
        <BasicText text={`출발: ${item.from.main} - ${item.from.sub}`} style={styles.detailText} />
        <BasicText text={`도착: ${item.destination.main} - ${item.destination.sub}`} style={styles.detailText} />
        <BasicText text={`시간: ${item.time}`} style={styles.detailText} />
        <BasicText text={`동승자: (${item.users}/${item.capacity})`} style={styles.detailText} />
        {item.tags && item.tags.length > 0 && (
          <View style={styles.tags}>
            {item.tags.map((tag: string, idx: number) => (
              <BasicText key={idx} text={tag} style={styles.tagText} />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default NowGaldaeDetail;

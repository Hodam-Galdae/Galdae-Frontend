import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from '../styles/Settlement.style';
import SVG from '../components/SVG';
import BasicText from '../components/BasicText';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Header from '../components/Header';
import SVGButton from '../components/button/SVGButton';
import {theme} from '../styles/theme';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { getMembers, MemberResponse } from '../api/chatApi';

type RootStackParamList = {
  Settlement: {data: Readonly<SettlementType>};
};

type SettlementType = {
  accountNumber: String;
  accountBank: String;
  cost: number;
  time: Date;
  id: string;
};

const Settlement: React.FC = () => {
  const [members, setMembers] = useState<MemberResponse[]>([]);
  const {params} = useRoute<RouteProp<RootStackParamList, 'Settlement'>>();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'Settlement'>
    >();
  const data = params.data;

  const fetchMembers = useCallback(async() => {
      const memberData = await getMembers(data.id);
      setMembers(memberData);
  }, [data]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return (
    <View style={styles.container}>
      <Header
        leftButton={
          <SVGButton onPress={() => navigation.goBack()} iconName="LeftArrow" />
        }
        title={
          <BasicText
            text="정산 상세"
            style={{
              fontSize: theme.fontSize.size22,
              color: theme.colors.black,
              fontWeight: '700',
            }}
          />
        }
      />
      <View style={styles.wrapper}>
        <View style={styles.account}>
          <SVG name="Bank" width={26} height={26} style={styles.accountIcon} />
          <BasicText style={styles.accountText}>
            {data.accountBank + ' ' + data.accountNumber}
          </BasicText>
        </View>
        <BasicText style={styles.costTitle}>{data.cost + '원'}</BasicText>
        <BasicText style={styles.costSubTitle}>
          {'요청일 : ' + data.time}
        </BasicText>
        <TouchableOpacity>
          <View style={styles.galleryBtn}>
            <SVG
              style={styles.galleryIcon}
              width={12}
              height={12}
              name="GalleryBlack"
            />
            <BasicText style={styles.galleryText} text="사진 등록" />
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />
        <BasicText style={styles.allCostText}>
          {'총 금액 ' + data.cost}
        </BasicText>
        {members.map(e => {
          return (
            <View key={e.memberId} style={styles.userContainer}>
              <SVG name="DefaultProfile" style={styles.userIcon} />
              <BasicText style={styles.userText} text={e.memberName} />
              <BasicText style={styles.userText}>
                {Math.ceil(data.cost / members.length) + '원'}
              </BasicText>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Settlement;

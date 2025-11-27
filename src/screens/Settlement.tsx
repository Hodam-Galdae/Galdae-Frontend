import React, {useState} from 'react';
import { Image, View, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/Settlement.style';
import SVG from '../components/SVG';
import BasicText from '../components/BasicText';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Header from '../components/Header';
import SVGButton from '../components/button/SVGButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PaymentSummary, sendPaymentNotification } from '../api/chatApi';
import { banks, BankOption } from '../constants/bankOptions';

type RootStackParamList = {
  Settlement: { data: PaymentSummary; chatroomId: number };
};

const Settlement: React.FC = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Settlement'>>();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'Settlement'>
    >();
  const data: PaymentSummary = params.data;
  const chatroomId: number = params.chatroomId;
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  console.log('💰 [정산 상세] 전체 데이터:', data);
  console.log('💰 [정산 상세] chatroomId (route param):', chatroomId, 'type:', typeof chatroomId);
  console.log('👥 [정산 상세] 멤버 목록:', data.members);

  data.members.forEach((member, idx) => {
    console.log(`  멤버 ${idx + 1}:`, {
      id: member.id,
      name: member.name,
      image: member.image,
      imageType: typeof member.image,
    });
  });
  return (
    <View style={styles.container}>
      <Header
        leftButton={
          <SVGButton onPress={() => navigation.goBack()} iconName="LeftArrow" />
        }
        title={
          <BasicText
            text="정산 상세"
            style={styles.headerText}
          />
        }
        style={styles.header}
      />
      <View style={styles.wrapper}>
        <View style={styles.account}>
          {data.bankType && data.accountNumber ? (
            <>
              <SVG width={26} height={26} style={styles.accountIcon} name={
                banks.find((bank: BankOption) => bank.name === data.bankType)?.svg || 'Bank_KB'} />
              <BasicText style={styles.accountText}>
                {data.bankType + ' ' + data.accountNumber}
              </BasicText>
            </>
          ) : (
            <BasicText style={styles.accountText}>
              계좌를 등록해주세요.
            </BasicText>
          )}
        </View>
        <BasicText style={styles.costTitle}>{data.totalCost.toLocaleString() + '원'}</BasicText>
        <BasicText style={styles.costSubTitle}>
          {'요청일 : ' + data.requestTime}
        </BasicText>

        <View style={styles.divider} />
        <BasicText style={styles.allCostText}>
          {'총 금액 ' + data.totalCost.toLocaleString() + '원'}
        </BasicText>
        {data.members.map(e => {
          // FIXME: 백엔드 버그 - name과 image 필드가 서로 바뀌어 있음
          const actualName = e.image || '이름 없음';
          const actualImage = e.name || null;

          const hasImageError = imageErrors[e.id];
          const shouldShowImage = actualImage && !hasImageError;

          const handleSendNotification = async () => {
            try {
              console.log('📨 [정산 알림] 전송 시작:', actualName, 'memberId:', e.id, 'chatroomId:', chatroomId);
              await sendPaymentNotification(chatroomId, e.id);
              console.log('✅ [정산 알림] 전송 성공:', actualName);
              Alert.alert('알림 전송 완료', `${actualName}님에게 정산 알림을 보냈습니다.`);
            } catch (error) {
              console.error('❌ [정산 알림] 전송 실패:', error);
              Alert.alert('알림 전송 실패', '정산 알림 전송에 실패했습니다. 다시 시도해주세요.');
            }
          };

          return (
            <View key={e.id} style={styles.userRow}>
              <View style={styles.userContainer}>
                {shouldShowImage ? (
                  <Image
                    source={{uri: actualImage}}
                    style={styles.userIcon}
                    onError={() => {
                      console.log('❌ [이미지 로드 실패]', actualName, actualImage);
                      setImageErrors(prev => ({...prev, [e.id]: true}));
                    }}
                  />
                ) : (
                  <SVG name="DefaultProfile" style={styles.userIcon} />
                )}
                <BasicText style={styles.userName} text={actualName} />
                <BasicText style={styles.userCost}>
                  {data.personalCost.toLocaleString() + '원'}
                </BasicText>
              </View>
              <TouchableOpacity
                style={styles.notificationBadge}
                onPress={handleSendNotification}
              >
                <BasicText style={styles.notificationText}>정산 알림 보내기</BasicText>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Settlement;

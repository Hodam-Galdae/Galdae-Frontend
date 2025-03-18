// NowGaldaeDetail.tsx
import React,{useState,useEffect} from 'react';
import { View,Image } from 'react-native';
import { WebView } from 'react-native-webview'; // 추가
import BasicText from '../components/BasicText';
import SVGButton from '../components/button/SVGButton';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Header from '../components/Header';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../styles/NowGaldaeDetail.style';
import SVG from '../components/SVG';
import { theme } from '../styles/theme';
import TextTag from '../components/tag/TextTag';
import BasicButton from '../components/button/BasicButton';
import { ScrollView } from 'react-native-gesture-handler';
import { getPostDetail } from '../api/postApi';

// 내비게이션 스택 타입 정의 (이전과 동일)
type RootStackParamList = {
  CreateGaldae: undefined;
  NowGaldae: undefined;
  NowGaldaeDetail: { postId: string };
};

type NowGaldaeDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NowGaldaeDetail'>;
type NowGaldaeDetailRouteProp = RouteProp<RootStackParamList, 'NowGaldaeDetail'>;

const NowGaldaeDetail: React.FC = () => {
  const navigation = useNavigation<NowGaldaeDetailScreenNavigationProp>();
  const route = useRoute<NowGaldaeDetailRouteProp>();
  const [loading, setLoading] = useState<boolean>(false);
  const { postId } = route.params; // ✅ 전달받은 postId
  const [galdaeDetail, setGaldaeDetail] = useState<any>(null);

  //const mapUrl = `https://galdae-kakao-map.vercel.app/?startLat=${galdaeDetail.from.lat}&startLng=${galdaeDetail.from.lng}&endLat=${galdaeDetail.destination.lat}&endLng=${galdaeDetail.destination.lng}`;
  //console.log(`mapUrl: `,mapUrl);
  const goBack = () => navigation.goBack();
  const handleParticipateGaldae = () =>{
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    },200);
  };

   // ✅ postId로 상세 정보 조회
   useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await getPostDetail({ postId });
        console.log('✅ 가져온 갈대 상세 정보:', response);
        setGaldaeDetail(response); // API 응답을 상태로 저장
      } catch (error) {
        console.error('❌ 갈대 상세 조회 실패:', error);
      }
    };

    fetchPostDetail();
  }, [postId]);
  if (!galdaeDetail) {
    return (
      <View >
        <BasicText text="로딩 중..." />
      </View>
    );
  }
  const mapUrl = `https://galdae-kakao-map.vercel.app/?startLat=${galdaeDetail.from.lat}&startLng=${galdaeDetail.from.lng}&endLat=${galdaeDetail.destination.lat}&endLng=${galdaeDetail.destination.lng}`;

  return (
    <View style={styles.main}>
      <Header
        leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack} />}
        title={
        <View style={styles.headerTitle}>
            <SVG name="location_line"  width={22} height={22}/>
            <BasicText text={galdaeDetail.from.main} style={styles.headerText} />
            <SVG name="arrow_right_line" width={22} height={22}/>
            <BasicText text={galdaeDetail.destination.main} style={styles.headerText} />
        </View>
        }
      />
      <ScrollView style={styles.content}>

        <View style={styles.advertiseBox}>
            <BasicText text="advertiseBox"/>
        </View>

        <View key={galdaeDetail.id} style={styles.borderedListBox}>
          <BasicText text={galdaeDetail.owner} style={styles.galdaeOwner} />
          <View style={styles.fromContainer}>
            <SVG name="Car" />
            <BasicText text={galdaeDetail.from.main} style={styles.fromMainLocation} />
            <BasicText text={galdaeDetail.from.sub} style={styles.fromSubLocation} />
          </View>
          <View style={styles.toContainer}>
            <View style={styles.fromToLine}>
              <SVG name="FromToLine" />
            </View>
            {Array(galdaeDetail.users)
              .fill(null)
              .map((_, idx) => (
                <SVG key={`user-${galdaeDetail.id}-${idx}`} name="User" />
              ))}
            {Array(galdaeDetail.capacity - galdaeDetail.users)
              .fill(null)
              .map((_, idx) => (
                <SVG key={`disabled-${galdaeDetail.id}-${idx}`} name="DisabledUser" />
              ))}
            <BasicText
              text={`(${galdaeDetail.users}/${galdaeDetail.capacity})`}
              fontWeight={500}
              fontSize={theme.fontSize.size16}
              color={theme.colors.gray1}
            />
          </View>
          <View style={styles.toContainer}>
            <SVG name="Location" />
            <BasicText text={galdaeDetail.destination.main} style={styles.fromMainLocation} />
            <BasicText text={galdaeDetail.destination.sub} style={styles.fromSubLocation} />
          </View>
          <View style={styles.timeContainer}>
            <SVG name="Clock" />
            <View>
              <BasicText
                text={galdaeDetail.timeAgreement ? '시간 협의가능' : '시간 협의불가'}
                style={styles.fromMainLocation}
                color={theme.colors.gray2}
                fontSize={theme.fontSize.size10}
              />
              <BasicText
                text={galdaeDetail.time}
                style={styles.fromSubLocation}
                color={theme.colors.black}
                fontSize={theme.fontSize.size14}
              />
            </View>
          </View>
          <View style={styles.tags}>
            {galdaeDetail.tags.map((tag:string, index:number) =>
               <TextTag key={index} text={tag} />
            )}
          </View>
        </View>

        <View style={styles.map}>
          <WebView source={{ uri: mapUrl }} style={styles.map}/>
        </View>

        <BasicText text="유저정보" style={styles.userInfo} />

        <View style={styles.userInfoBox}>
            <View style={styles.userInfos}>
              <View style={styles.profile}>
                <Image
                  source={require('../assets/test.jpg')}
                  style={styles.profileImg}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.userInfoText}>
                <BasicText text="건국대 글로컬캠퍼스" style={styles.universityText}/>
                <BasicText text="하재연" style={styles.nameText}/>
              </View>
            </View>
            <SVG name="Badge" style={styles.badge}/>
        </View>

        <View style={styles.participateContainer}>
          <BasicButton
              text="참여하기"
              buttonStyle={styles.participateBtn}
              textStyle={styles.participateText}
              loading={loading}
              onPress={handleParticipateGaldae}
            />
        </View>
      </ScrollView>
    </View>
  );
};

export default NowGaldaeDetail;

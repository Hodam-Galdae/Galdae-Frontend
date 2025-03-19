// MyInfo.tsx 테스트
import React,{useState,useEffect,useCallback} from 'react';
import { View,ScrollView,Image ,ActivityIndicator,Alert} from 'react-native';
import SVG from '../components/SVG';
import styles from '../styles/MyInfo.style';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import BasicButton from '../components/button/BasicButton';
import BasicText from '../components/BasicText';
import useImagePicker from '../hooks/useImagePicker';
import SVGButton from '../components/button/SVGButton';
import SVGTextButton from '../components/button/SVGTextButton';
import moment from 'moment-timezone';
import { theme } from '../styles/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules/redux/RootReducer'; // RootState 타입 (store 설정에 따라 경로 수정)
import { setUserInfo } from '../modules/redux/slice/myInfoSlice';
//API
import { getMyPostHistory, getUserInfo } from '../api/membersApi';

//type
import {MyPostHistory} from '../types/getTypes';

// 내비게이션 스택 타입 정의
type RootStackParamList = {
  Payment: undefined;
  MyGaldae:undefined;
  NicknameChange: { nickname: string }; // 수정: 닉네임을 받음
  Announcement:undefined;
  UserGuide:undefined;
  TermsOfUse:undefined;
  FAQ:undefined;
  Logout:undefined;
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const MyInfo: React.FC = () => {
  // const newGaldaeList = [
  //   { time: '방금전', dest: '충주 터미널', depart: '정문' },
  //   { time: '1일전', dest: '충주역', depart: '학교' },
  //   { time: '2일전', dest: '시청', depart: '정문' },
  //   { time: '3일전', dest: '마트', depart: '학교' },
  //   { time: '4일전', dest: '공원', depart: '후문' },
  //   { time: '5일전', dest: '카페', depart: '도서관' },
  //   { time: '6일전', dest: '병원', depart: '정문' },
  //   { time: '7일전', dest: '은행', depart: '학교' },
  //   { time: '8일전', dest: '백화점', depart: '후문' },
  //   { time: '9일전', dest: '기차역', depart: '정문' },
  //   { time: '10일전', dest: '공항', depart: '터미널' },
  //   { time: '11일전', dest: '도서관', depart: '후문' },
  //   { time: '12일전', dest: '박물관', depart: '정문' },
  //   { time: '13일전', dest: '호텔', depart: '학교' },
  //   { time: '14일전', dest: '극장', depart: '정문' },
  // ];
  const myInfoMenu = [
    {text: '결제 · 정산관리', onPress: ()=>{navigation.navigate('Payment');}},
    {text: '공지 사항', onPress: ()=>{navigation.navigate('Announcement');}},
    {text: '이용 가이드', onPress: ()=>{navigation.navigate('UserGuide');}},
    {text: '이용약관', onPress: ()=>{navigation.navigate('TermsOfUse');}},
    {text: 'FAQ/문의하기', onPress: ()=>{navigation.navigate('FAQ');}},
    {text: '로그아웃', onPress: ()=>{navigation.navigate('Logout');}},
  ];
  const dispatch = useDispatch();
  const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
  const [loading, setLoading] = useState<boolean>(false);
  //const [profileImg, setProfileImg] = useState<string>('');
  const {imageUri, getImageByGallery} = useImagePicker();
  // ✅ 사용자 정보 상태
  //const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  //const [userLoading, setUserLoading] = useState<boolean>(true);
  // Redux에서 사용자 정보 가져오기
  const userInfo = useSelector((state: RootState) => state.myInfoSlice.userInfo);
  // ✅ 내 갈대 기록 데이터 상태
  const [myGaldaeHistory, setMyGaldaeHistory] = useState<MyPostHistory[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(true); // 로딩 상태 추가

  // 사용자 정보 불러오기 (Redux 업데이트)
  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await getUserInfo();
      console.log('🚀 사용자 정보:', response);
      dispatch(setUserInfo(response));
    } catch (error) {
      console.error('❌ 사용자 정보 조회 실패:', error);
      Alert.alert('오류', '사용자 정보를 불러오는데 실패했습니다.');
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);


 // 초기 마운트 시 유저 정보 fetch
 useEffect(() => {
  fetchUserInfo();
}, [fetchUserInfo]);

// 화면 포커스될 때마다 최신 유저 정보 재호출
useFocusEffect(
  useCallback(() => {
    fetchUserInfo();
  }, [fetchUserInfo])
);
  // ✅ 내 갈대 기록 조회 API 호출
  useEffect(() => {
    const fetchMyPostHistory = async () => {
      try {
        const response = await getMyPostHistory();
        console.log('내 갈대 기록 조회 API Response: ',response );
        setMyGaldaeHistory(response); // 응답 데이터 상태 저장
      } catch (error) {
        console.error('❌ 내 갈대 기록 조회 실패:', error);
      } finally {
        setHistoryLoading(false); // 로딩 완료
      }
    };

    fetchMyPostHistory();
  }, []);

  const handlePress = () => {

    setLoading(true);
    // 버튼 클릭 시 원하는 로직을 수행하고, 완료 후 로딩 상태를 false로 전환합니다.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const handleMorePress = () =>{
    navigation.navigate('MyGaldae');
  };



  const formatTimeAgo = (departureTime: string) => {
    // 오늘 날짜 (시간 제거)
    const today = moment().startOf('day');
    // 서버에서 받은 출발 시간을 UTC 기준으로 로컬 날짜로 변환 후, 시간 제거
    const departureDate = moment.utc(departureTime).local().startOf('day');
  
    // 콘솔에 오늘 날짜와 출발 날짜 출력
    console.log(`오늘 날짜: ${today.format('YYYY-MM-DD')}`);
    console.log(`출발 날짜: ${departureDate.format('YYYY-MM-DD')}`);
  
    // 오늘 날짜와 출발 날짜 간 차이를 일(day) 단위로 계산
    const diffDays = today.diff(departureDate, 'days');
  
    // 차이가 0이면 "오늘", 아니면 "X일 전"으로 반환
    return diffDays === 0 ? '오늘' : `${diffDays}일 전`;
  };


  useEffect(() => {
      if (imageUri !== undefined) {
        //setProfileImg(imageUri);

      }
    }, [imageUri]);
  return (
    <View>
      <ScrollView>
        <BasicButton
          text="어플 공지사항/안내"
          onPress={handlePress}
          loading={loading}
          buttonStyle={styles.notiButton}
          textStyle={styles.notiText}
        />
        <ScrollView style={styles.container}>
          <BasicText text={`${userInfo?.nickname}의 갈대`} style={styles.startGaldae}/>

          <View style={styles.userInfoBox}>
            <View style={styles.userInfos}>
              <View style={styles.profile}>
              {(imageUri || userInfo?.image) ? (
                <Image
                  source={
                    imageUri
                      ? { uri: imageUri }
                      : { uri: userInfo!.image! }
                  }
                  style={styles.profileImg}
                  resizeMode="cover"
                />
              ) : (
                <SVG name="profileImg" style={styles.profileImg} />
              )}
                <SVGButton iconName="camera_2_line" buttonStyle={styles.profileCamera} onPress={getImageByGallery}/>
              </View>
              <View style={styles.userInfoText}>
                <BasicText text={`${userInfo?.university}`} style={styles.universityText}/>
                <View style={styles.profileName}>
                  {/* 네비게이션 시 닉네임도 함께 전달 */}
                  <BasicText
                    text={`${userInfo?.nickname}`}
                    style={styles.nameText}
                    onPress={() =>
                      navigation.navigate('NicknameChange', {
                        nickname: userInfo?.nickname || '',
                      })
                    }
                  />
                  <SVGButton
                    iconName="edit_line"
                    onPress={() =>
                      navigation.navigate('NicknameChange', {
                        nickname: userInfo?.nickname || '',
                      })
                    }
                  />
                </View>
              </View>
            </View>
           { userInfo?.isAuthenticated &&  <SVG name="Badge" style={styles.badge}/>}
          </View>

          <View style={styles.nowGaldaeTitle}>
            <BasicText text="내 갈대기록" style={styles.nowGaldae}/>
            <SVGTextButton
            iconName="More"
            text="더보기"
            textStyle={styles.more}
            iconPosition="right"
            onPress={handleMorePress}
            enabledColors={{
              backgroundColor: 'transparent',
              textColor: theme.colors.gray1,
              borderColor: 'transparent',
            }}
            />
        </View>
        {historyLoading ? (
            <ActivityIndicator size="large" color={theme.colors.brandColor} />
          ) : myGaldaeHistory.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
              {myGaldaeHistory.map((list, index) => (
                <View key={index} style={styles.newGaldaeList}>
                  <BasicText text={formatTimeAgo(list.departureTime)} style={styles.newGaldaeTimeText} />
                  <BasicText text={`${list.departure}`} style={styles.newGaldaeDepartText} />
                  <SVG name="arrow_down_fill_gray2" style={styles.newGaldaeArrowIcon} />
                  <BasicText text={`${list.arrival}`} style={styles.newGaldaeDestText} />
                </View>
              ))}
            </ScrollView>
          ) : (
            <BasicText text="갈대 기록이 없습니다."  />
          )}



        <BasicText text="내 정보" style={styles.myInfoTitle}/>
        <View style={styles.myInfos}>
          {myInfoMenu.map(menu=>(
            <SVGTextButton
            key={menu.text}
            text={menu.text}
            iconName="right_line"
            iconPosition="right"
            style={styles.search}
            textStyle={styles.searchText}
            SVGStyle={styles.searchSVG}
            enabledColors={
              {
                backgroundColor:theme.colors.white,
                textColor:theme.colors.gray2,
              }
            }
            onPress={menu.onPress}
          />
          ))}
        </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default MyInfo;


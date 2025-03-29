/* eslint-disable react-native/no-inline-styles */
// Home.tsx 테스트
import React, {useState, useRef,useEffect} from 'react';
import {ScrollView, View, TouchableOpacity,ActivityIndicator,RefreshControl,Alert} from 'react-native';
import { CreatePostRequest } from '../types/postTypes'; // API 요청 타입 가져오기
import styles from '../styles/Home.style';
import BasicButton from '../components/button/BasicButton';
import BasicText from '../components/BasicText';
import SVGTextButton from '../components/button/SVGTextButton';
import {theme} from '../styles/theme';
import SVGButton from '../components/button/SVGButton';
import SVG from '../components/SVG';
import TextTag from '../components/tag/TextTag';
import DeletePopup from '../components/popup/DeletePopup';
import FloatingButton from '../components/button/FloatingButton';
import GaldaeItem from '../components/GaldaeItem';
import CreateGaldaePopup from '../components/popup/CreateGaldaePopup';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment-timezone/builds/moment-timezone-with-data';
import ToastPopup from '../components/popup/ToastPopup';

import NowGaldaeSameGender from '../components/popup/NowGaldaeSameGender';
//type
import {MyCreatedPost} from '../types/getTypes';

//API
import { createPost,getPosts } from '../api/postApi'; // 갈대 생성 API 불러오기
import { deletePost } from '../api/postApi';
import {getMyCreatedPosts} from '../api/membersApi';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
//import { useSelector } from 'react-redux';
//import { RootState } from '../modules/redux/RootReducer'; // store.ts에서 RootState 가져오기

// type
import { GetPostsRequest } from '../types/postTypes';
import {GaldaeItemType } from '../types/getTypes';

// redux
//import {  useSelector } from 'react-redux';
//import { useAppDispatch } from '../modules/redux/store';
//import { fetchGaldaePosts } from '../modules/redux/slice/galdaeSlice';
//import { RootState } from '../modules/redux/RootReducer';
type RootStackParamList = {
  CreateGaldae: undefined;
  NowGaldae: undefined;
  NowGaldaeDetail: { postId: string };
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
import FastGaldaeStartPopup, {
  FastGaldaeStartPopupRef,
} from '../components/popup/FastGaldaeStartPopup';
import FastGaldaeEndPopup, {
  FastGaldaeEndPopupRef,
} from '../components/popup/FastGaldaeEndPopup';
import FastGaldaeTimePopup, {
  FastGaldaeTimePopupRef,
} from '../components/popup/FastGaldaeTimePopup';
import { Portal } from '@gorhom/portal';

type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
  NowGaldaeDetail: { postId: string };
};

const Home: React.FC<HomeProps> = () => {
  const [refreshing, setRefreshing] = useState(false);
  //const [loading, setLoading] = useState<boolean>(false);
  //const { posts } = useSelector((state: RootState) => state.galdaeSlice);
  const [posts, setPosts] = useState<GaldaeItemType[]>([]); // API 응답 데이터 타입에 맞게 수정 가능
  const [createGaldaeLoading, setCreateGaldaeLoading] = useState<boolean>(false);
  const [deletePopupVisible, setDeletePopupVisible] = useState<boolean>(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [generateLoading, setgenerateLoading] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  const [createGaldaePopupVisible, setCreateGaldaePopupVisible] =
    useState<boolean>(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [departureDate, setDepartureDate] = useState<string | null>(null); // "YYYY-MM-DD" 형식
  const [departureAmPm, setDepartureAmPm] = useState<'오전' | '오후'>('오전');
  // 출발지 관련 상태
  const [departureLargeName, setDepartureLargeName] = useState<string>('출발지 선택');
  const [departureLargeId, setDepartureLargeId] = useState<number|null>(null);

  const [departureSmallName, setDepartureSmallName] = useState<string>('출발지 선택');
  const [departureSmallId, setDepartureSmallId] = useState<number|null>(null);
  const [sameGenderPopupVisible, setSameGenderPopupVisible] = useState(false);
  const [destinationLargeName, setDestinationLargeName] = useState<string>('도착지 선택');
  const [destinationLargeId, setDestinationLargeId] = useState<number|null>(null);

  const [destinationSmallName, setDestinationSmallName] = useState<string>('도착지 선택');
  const [destinationSmallId, setDestinationSmallId] = useState<number|null>(null);

  const [departureHour, setDepartureHour] = useState<number>(0);
  const [departureMinute, setDepartureMinute] = useState<number>(0);
  const fastGaldaeStartPopupRef = useRef<FastGaldaeStartPopupRef>(null);
  const fastGaldaeEndPopupRef = useRef<FastGaldaeEndPopupRef>(null);
  const fastGaldaeTimePopupRef = useRef<FastGaldaeTimePopupRef>(null);
  const [myCreatedGaldaeList, setMyCreatedGaldaeList] = useState<MyCreatedPost[]>([]); // ✅ 내가 생성한 갈대 목록 상태 추가
  const [myCreatedGaldaeLoading, setMyCreatedGaldaeLoading] = useState<boolean>(true); // ✅ API 로딩 상태
  const [createGaldaeBoolean, setCreateGaldaeBoolean] = useState<boolean>(false);
  //const dispatch = useAppDispatch();

  const fetchMyCreatedGaldae = async () => {
    try {
      const response = await getMyCreatedPosts();
      setMyCreatedGaldaeList(response); // 응답 데이터 상태 저장
    } catch (error) {
      console.error('❌ 내가 생성한 갈대 목록 불러오기 실패:', error);
    } finally {
      setMyCreatedGaldaeLoading(false); // 로딩 완료
    }
  };
  // ✅ 내가 생성한 갈대 불러오기
  useEffect(() => {
    fetchMyCreatedGaldae();
  }, [createGaldaeBoolean]);

// 새로고침 시 실행할 함수 (예: 데이터 다시 불러오기)
const onRefresh = async () => {
  setRefreshing(true);
  try {
    fetchPosts();
    fetchMyCreatedGaldae();
    formatDepartureDateTime();
  } catch (error) {
    console.error('새로고침 에러:', error);
  } finally {
    setRefreshing(false);
  }
};
// 0번째 페이지의 3개 데이터만 가져오기 위한 API 호출 함수
const fetchPosts = async () => {

  const params: GetPostsRequest = {
    pageNumber: 0,
    pageSize: 3,
    direction: 'ASC',
    properties: ['departureTime'],
  };
  try {
    const data = await getPosts(params);
    console.log( `
      🪄홈화면 실시간 갈대 목록 응답: 
      `,data);
    setPosts(data.content);
  } catch (error) {
    console.error('갈대 조회 실패:', error);
  } finally {

  }
};

// 컴포넌트가 마운트될 때 데이터 호출
useEffect(() => {
  fetchPosts();
}, []);
// const handlePress = () => {
//   setLoading(true);
//   // 버튼 클릭 시 원하는 로직을 수행하고, 완료 후 로딩 상태를 false로 전환합니다.
//   setTimeout(() => {
//     setLoading(false);
//   }, 2000);
// };

  const handleCreateGaldaeConfirm = async () => {

    setCreateGaldaeLoading(true);
    // 사용자가 선택한 값들을 조합하여 ISO 8601 형식의 출발일시 생성
    const formattedDepartureTime = getFormattedDepartureTime();
  if(departureLargeId === null || departureSmallId === null || destinationLargeId === null || destinationSmallId === null){
    Alert.alert('출발지 또는 도착지를 다시 선택해주세요!');
    return;
   }
    const generateGaldaeData: CreatePostRequest = {
      subDepartureId:departureSmallId, // 예시 값 (실제 값에 맞게 수정)
      majorDepartureId: departureLargeId,
      majorArrivalId: destinationLargeId,
      subArrivalId: destinationSmallId,
      departureTime: formattedDepartureTime, // 선택한 출발일시 ISO 문자열
      passengerType: 'DONT_CARE',
      arrangeTime: 'POSSIBLE',
      passengerCount: 4,
      isFavoriteRoute: false,
    };

    console.log('🚀 서버로 보낼 갈대 생성 데이터:', generateGaldaeData);

    try {
      await createPost(generateGaldaeData);
      setCreateGaldaePopupVisible(false);
      setToastVisible(true);
      setCreateGaldaeBoolean(!createGaldaeBoolean);
      setTimeout(() => {
        setToastVisible(false);
      }, 2000);
    } catch (error) {
      console.error('❌ 갈대 생성 실패:', error);
    } finally {
      setCreateGaldaeLoading(false);
    }
  };


  const handleMorePress = () => {
    navigation.navigate('NowGaldae');
  };
  const handleTimePopupConfirm = (
    selectedDate: string,
    amPm: '오전' | '오후',
    hour: number,
    minute: number,
  ) => {
    setDepartureDate(selectedDate);
    setDepartureAmPm(amPm);
    setDepartureHour(hour);
    setDepartureMinute(minute);
    console.log( `${selectedDate}  ${amPm} ${hour} ${minute}`);
  };
  // 출발일시 문자열 포맷 함수
  const formatDepartureDateTime = () => {
    if (!departureDate) {
      // const now = moment();
      // const formattedDate = now.format('YYYY년 M월 D일 (ddd)'); // 예: 2025년 11월 12일 (수)
      // const hour = now.hour();
      // const minute = now.minute();
      // const amPm = hour < 12 ? '오전' : '오후';
      // let hour12 = hour % 12;
      // if (hour12 === 0) {
      //   hour12 = 12;
      // }
      // const formattedTime = `${amPm} ${hour12} : ${
      //   minute < 10 ? '0' + minute : minute
      // }`;
      return '출발 시간을 선택해 주세요.';
    }
    const dateObj = moment(departureDate, 'YYYY-MM-DD');
    // 예: "2025년 11월 12일 (수)"
    const formattedDate = dateObj.format('YYYY년 M월 D일 (ddd)');
    // 예: "오전 2 : 30" (분이 10 미만일 경우 앞에 0 추가)
    const formattedTime = `${departureAmPm} ${departureHour} : ${
      departureMinute < 10 ? '0' + departureMinute : departureMinute
    }`;
    return `${formattedDate} ${formattedTime}`;
  };
// 출발일시를 ISO 8601 형식으로 변환하는 함수 예시
const getFormattedDepartureTime = (): string => {
  // 12시간 형식을 24시간 형식으로 변환
  if (!departureDate) {
    return '출발 시간을 선택해 주세요.';
  }
    let hour24 = departureHour;
  if (departureAmPm === '오후' && departureHour < 12) {
    hour24 += 12;
  } else if (departureAmPm === '오전' && departureHour === 12) {
    hour24 = 0;
  }
  // 선택한 날짜와 시간 정보를 Asia/Seoul 타임존의 moment 객체로 생성
  const selectedMoment = moment.utc(departureDate).set({
    hour: hour24,
    minute: departureMinute,
    second: 0,
    millisecond: 0,
  });
  return selectedMoment.toISOString(); // UTC 기준 ISO 문자열 반환
};
  const toggleFastGaldaeStartPopup = () => {
    fastGaldaeStartPopupRef.current?.open();
  };

  const toggleFastGaldaeEndPopup = () => {
    fastGaldaeEndPopupRef.current?.open();
  };

  const toggleFastGaldaeTimePopup = () => {
    fastGaldaeTimePopupRef.current?.open();
  };

  const openCreateGaldaePopup = () => {
    const formattedDepartureTime = getFormattedDepartureTime();

    if(departureLargeName === '출발지 선택' || departureSmallName === '출발지 선택' || destinationLargeName === '도착지 선택' || destinationSmallName === '도착지 선택'){
      Alert.alert('출발지 또는 도착지를 제대로 선택해주세요!');
      return;
   }else if(formattedDepartureTime === '출발 시간을 선택해 주세요.'){
    Alert.alert('출발 시간을 선택해 주세요.');
    return;
 }
    setgenerateLoading(true);
    setgenerateLoading(false);
    setCreateGaldaePopupVisible(true);
  };
  const closeCreateGaldaePopup = () => {
    setCreateGaldaePopupVisible(false);
  };
  // 포스트 삭제를 위한 핸들러 (본인 글인 경우에만 활성화)
  const handleLongPress = (post: MyCreatedPost | GaldaeItemType) => {
    // 예시로 본인 글 여부는 post.isMine 속성으로 확인
    if (post) { //.isMine
      setSelectedPostId(post.postId);
      setDeletePopupVisible(true);
    }
  };
  const handleCreateCaledaeConfirm = () => {
    const formattedDepartureTime = getFormattedDepartureTime();

    if(departureLargeName === '출발지 선택' || departureSmallName === '출발지 선택' || destinationLargeName === '도착지 선택' || destinationSmallName === '도착지 선택'){
      Alert.alert('출발지 또는 도착지를 제대로 선택해주세요!');
      return;
   }else if(formattedDepartureTime === '출발 시간을 선택해 주세요.'){
    Alert.alert('출발 시간을 선택해 주세요.');
    return;
 }
    else{
    handleCreateGaldaeConfirm();
    closeCreateGaldaePopup();
    setToastVisible(true);
   }
  };
  const handleDeletePost = async () => {
      if (!selectedPostId) {return;}
      try {
        await deletePost(selectedPostId);
        fetchMyCreatedGaldae();
        Alert.alert('삭제 완료', '선택한 갈대가 삭제되었습니다.');
        setDeletePopupVisible(false);
        setSelectedPostId(null);
      } catch (error) {
        Alert.alert('삭제 실패', '글 삭제에 실패했습니다. 다시 시도해주세요.');
        console.error(error);
      }
  };
  const handleSwitch = () => {
    setDepartureLargeName(destinationLargeName);
    setDepartureSmallName(destinationSmallName);
    setDepartureSmallId(destinationSmallId);
    setDepartureLargeId(destinationLargeId);

    setDestinationLargeId(departureLargeId);
    setDestinationSmallId(departureSmallId);
    setDestinationLargeName(departureLargeName);
    setDestinationSmallName(departureSmallName);
  };
  return (
    <View style={{height:'100%'}}>
      <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <BasicButton
          text="어플 공지사항/안내"
          //onPress={handlePress}
          //loading={loading}
          buttonStyle={styles.notiButton}
          textStyle={styles.notiText}
        />
        <ScrollView style={styles.container}>

          {myCreatedGaldaeList.length > 0 && (
            <View style={styles.madeGaldaeContainer}>
            <BasicText text="생성한 갈대" style={styles.madeGaldae} />
             {myCreatedGaldaeLoading ? (
              <ActivityIndicator size="large" color={theme.colors.brandColor} />
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
                {myCreatedGaldaeList.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.newGaldaeList} onPress={()=>navigation.navigate('NowGaldaeDetail', {postId: item.postId})} onLongPress={() => handleLongPress(item)} delayLongPress={100}>
                    <BasicText text={moment(item.createdAt).fromNow()} style={styles.newGaldaeTimeText} />
                    <BasicText text={`${item.departure}`} style={styles.newGaldaeDepartText} numberOfLines={1} ellipsizeMode="tail"/>
                    <SVG name="arrow_down_fill" style={styles.newGaldaeArrowIcon} />
                    <BasicText text={`${item.arrival}`} style={styles.newGaldaeDestText} numberOfLines={1} ellipsizeMode="tail"/>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
          )}


          <BasicText text="빠른 갈대 시작하기" style={styles.startGaldae} />
          <BasicText
            text="목적지, 시간만 고르고 빠르게 동승자를 구해보세요!"
            style={styles.startGaldaeEx}
          />

          <View style={styles.borderedBox}>
            <View style={styles.startAndEnd}>
              <TouchableOpacity
                style={styles.startContain}
                onPress={toggleFastGaldaeStartPopup}>
                <TextTag text="출발지" viewStyle={styles.start} />
                <BasicText text={departureLargeName} style={styles.mainPosName} />
                <BasicText text={departureSmallName} style={styles.subPosName} />
              </TouchableOpacity>

              <SVGButton
                iconName="Switch"
                buttonStyle={styles.switchBtn}
                SVGStyle={styles.switchIcon}
                onPress={handleSwitch}
              />

              <TouchableOpacity
                style={styles.startContain}
                onPress={toggleFastGaldaeEndPopup}>
                <TextTag text="도착지" viewStyle={styles.start} />
                <BasicText text={destinationLargeName} style={styles.mainPosName} />
                <BasicText text={destinationSmallName} style={styles.subPosName} />
              </TouchableOpacity>
            </View>

            <View style={styles.line} />

            <TouchableOpacity
              onPress={toggleFastGaldaeTimePopup}
              style={styles.startContainer}>
              <BasicText text="출발일시" style={styles.startTime} />
              <BasicText
                text={formatDepartureDateTime()}
                style={styles.startDateTime}
              />
            </TouchableOpacity>
          </View>

          <BasicButton
            text="생성하기"
            onPress={openCreateGaldaePopup}
            loading={generateLoading}
            buttonStyle={styles.generateButton}
            textStyle={styles.generateText}
          />

          {/* <View style={styles.advertiseBox}>
            <BasicText text="advertiseBox" />
          </View> */}

          <View style={styles.nowGaldaeTitle}>
            <BasicText text="실시간 갈대" style={styles.nowGaldae} />
            <SVGTextButton
              iconName="More"
              text="더보기"
              iconPosition="right"
              onPress={handleMorePress}
              enabledColors={{
                backgroundColor: 'transparent',
                textColor: theme.colors.gray1,
                borderColor: 'transparent',
              }}
              //buttonStyle={styles.button}
              //textStyle={styles.text}
            />
          </View>

          <View style={styles.nowGaldaeList}>
          {posts.map(item => (
              <GaldaeItem
                key={item.postId}
                item={item}
                onPress={ !item.isSameGender && item.passengerGenderType === 'SAME' ? () =>setSameGenderPopupVisible(true) : ()=> navigation.navigate('NowGaldaeDetail', {postId: item.postId}) }
                onLongPress={() => handleLongPress(item)}
              />
            ))}
          </View>
        </ScrollView>
      </ScrollView>

      <Portal>
        <FastGaldaeStartPopup
          ref={fastGaldaeStartPopupRef}
          onConfirm={(largeName,largeId, smallName, smallId) => {
            setDepartureLargeName(largeName);
            setDepartureLargeId(largeId);

            setDepartureSmallName(smallName);
            setDepartureSmallId(smallId);
          }}
          selectedStartPlaceId={destinationSmallId}
          onClose={() => console.log('팝업 닫힘')}
        />
      </Portal>

      <Portal>
        <FastGaldaeEndPopup
          ref={fastGaldaeEndPopupRef}
          onConfirm={(largeName,largeId, smallName, smallId) => {
            setDestinationLargeName(largeName);
            setDestinationLargeId(largeId);

            setDestinationSmallName(smallName);
            setDestinationSmallId(smallId);
          }}
          selectedStartPlaceId={departureSmallId}
          onClose={() => console.log('팝업 닫힘')}
        />
      </Portal>

      <Portal>
        <FastGaldaeTimePopup
          ref={fastGaldaeTimePopupRef}
          onConfirm={handleTimePopupConfirm}
          onClose={() => console.log('팝업 닫힘')}
        />
      </Portal>

      <CreateGaldaePopup
        loading={createGaldaeLoading}
        visible={createGaldaePopupVisible}
        onCancel={closeCreateGaldaePopup}
        onConfirm={handleCreateCaledaeConfirm}
        departureDateTime={formatDepartureDateTime()} // Home.tsx의 출발일시 포맷 함수 결과
        departureLocation={departureSmallName} // 출발지 소분류 (예: "정문")
        destination={destinationSmallName} // 도착지 소분류 (예: "던킨도너츠")
      />
      <FloatingButton onPress={() => navigation.navigate('CreateGaldae')} />
      <ToastPopup
        visible={toastVisible}
        text="갈대가 생성되었습니다!"
        onDismiss={() => setToastVisible(false)}
      />
      <NowGaldaeSameGender
        visible={sameGenderPopupVisible}
        onConfirm={()=>{setSameGenderPopupVisible(false);}}
      />
      <DeletePopup
      visible={deletePopupVisible}
      onCancel={() => {
        setDeletePopupVisible(false);
        setSelectedPostId(null);
      }}
      onConfirm={handleDeletePost}
      title="선택하신 갈대를"
      message="삭제하시겠습니까?"
      buttonText="삭제하기"
    />
    </View>
  );
};

export default Home;

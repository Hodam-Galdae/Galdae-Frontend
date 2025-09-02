/* eslint-disable react-native/no-inline-styles */
// Home.tsx 테스트
import React, {useState, useEffect} from 'react';
// import React, {useState, useRef, useEffect} from 'react'; // useRef 주석처리
import {
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
// import {CreatePostRequest} from '../types/postTypes'; // API 요청 타입 (주석처리)
import styles from '../styles/Home.style';
// import BasicButton from '../components/button/BasicButton';
import BasicText from '../components/BasicText';
import SVGButton from '../components/button/SVGButton';
import {theme} from '../styles/theme';
// import SVGButton from '../components/button/SVGButton';
import SVG from '../components/SVG';
// import TextTag from '../components/tag/TextTag';
import DeletePopup from '../components/popup/DeletePopup';
//import FloatingButton from '../components/button/FloatingButton';
import TaxiItem from './category/taxi/TexiItem';
import ServiceButton from '../components/ServiceButton';
// import CreateGaldaePopup from '../components/popup/CreateGaldaePopup';
import {useNavigation} from '@react-navigation/native';
import ToastPopup from '../components/popup/ToastPopup';
import {useAppDispatch} from '../modules/redux/store';
import NowGaldaeSameGender from '../components/popup/NowGaldaeSameGender';
import {fetchMyGaldaeHistory} from '../modules/redux/slice/myGaldaeSlice';
import {fetchHomeGaldaePosts} from '../modules/redux/slice/homeGaldaeSlice';
//type
import {MyCreatedPost} from '../types/getTypes';

//API
// import {createPost} from '../api/postApi'; // 갈대 생성 API (주석처리)
import {deletePost} from '../api/postApi';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from '../modules/redux/RootReducer'; // store.ts에서 RootState 가져오기
import {fetchMyCreatedGaldae} from '../modules/redux/slice/myCreatedGaldaeSlice';

// type
import {GaldaeItemType} from '../types/getTypes';

// redux
//import {  useSelector } from 'react-redux';
//import { useAppDispatch } from '../modules/redux/store';
//import { fetchGaldaePosts } from '../modules/redux/slice/galdaeSlice';
//import { RootState } from '../modules/redux/RootReducer';
type RootStackParamList = {
  CreateGaldae: undefined;
  NowGaldae: undefined;
  NowGaldaeDetail: {postId: string};
  TaxiNDivide: undefined;
  OTTNDivide: undefined;
  DeliveryNDivide: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
// 빠른 갈대 popup imports (주석처리)
// import FastGaldaeStartPopup, {
//   FastGaldaeStartPopupRef,
// } from '../components/popup/FastGaldaeStartPopup';
// import FastGaldaeEndPopup, {
//   FastGaldaeEndPopupRef,
// } from '../components/popup/FastGaldaeEndPopup';
// import FastGaldaeTimePopup, {
//   FastGaldaeTimePopupRef,
// } from '../components/popup/FastGaldaeTimePopup';
// import {Portal} from '@gorhom/portal';

type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
  NowGaldaeDetail: {postId: string};
};

const Home: React.FC<HomeProps> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const posts = useSelector((state: RootState) => state.homeGaldaeSlice.posts);
  const postsLoading = useSelector(
    (state: RootState) => state.homeGaldaeSlice.loading,
  );
  // const [createGaldaeLoading, setCreateGaldaeLoading] = useState<boolean>(false);
  const [deletePopupVisible, setDeletePopupVisible] = useState<boolean>(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  // const [generateLoading, setgenerateLoading] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  // const [createGaldaePopupVisible, setCreateGaldaePopupVisible] = useState<boolean>(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  // const [departureDate, setDepartureDate] = useState<string | null>(null); // "YYYY-MM-DD" 형식 (주석처리)
  // const [departureAmPm, setDepartureAmPm] = useState<'오전' | '오후'>('오전');
  // // 출발지 관련 상태 (주석처리)
  // const [departureLargeName, setDepartureLargeName] = useState<string>('출발지 선택');
  // const [departureLargeId, setDepartureLargeId] = useState<number | null>(null);
  // const [departureSmallName, setDepartureSmallName] = useState<string>('출발지 선택');
  // const [departureSmallId, setDepartureSmallId] = useState<number | null>(null);
  const [sameGenderPopupVisible, setSameGenderPopupVisible] = useState(false);
  // const [destinationLargeName, setDestinationLargeName] = useState<string>('도착지 선택');
  // const [destinationLargeId, setDestinationLargeId] = useState<number | null>(null);
  // const [destinationSmallName, setDestinationSmallName] = useState<string>('도착지 선택');
  // const [destinationSmallId, setDestinationSmallId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  // const [departureHour, setDepartureHour] = useState<number>(0);
  // const [departureMinute, setDepartureMinute] = useState<number>(0);
  // const fastGaldaeStartPopupRef = useRef<FastGaldaeStartPopupRef>(null);
  // const fastGaldaeEndPopupRef = useRef<FastGaldaeEndPopupRef>(null);
  // const fastGaldaeTimePopupRef = useRef<FastGaldaeTimePopupRef>(null);
  // const myCreatedGaldaeList = useSelector(
  //   (state: RootState) => state.myCreatedGaldaeSlice.list,
  // );
  // const myCreatedGaldaeLoading = useSelector(
  //   (state: RootState) => state.myCreatedGaldaeSlice.loading,
  // );

  // dispatch 생성
  // const [createGaldaeBoolean, setCreateGaldaeBoolean] = useState<boolean>(false);

  // ✅ 내가 생성한 갈대 불러오기
  useEffect(() => {
    dispatch(fetchMyCreatedGaldae());
  }, [dispatch]);

  // 새로고침 시 실행할 함수 (예: 데이터 다시 불러오기)
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      dispatch(fetchMyCreatedGaldae());
      dispatch(fetchHomeGaldaePosts());
      // formatDepartureDateTime();
    } catch (error) {
      // console.error('새로고침 에러:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // 컴포넌트가 마운트될 때 데이터 호출
  useEffect(() => {
    dispatch(fetchHomeGaldaePosts());
  }, [dispatch]);
  // const handlePress = () => {
  //   setLoading(true);
  //   // 버튼 클릭 시 원하는 로직을 수행하고, 완료 후 로딩 상태를 false로 전환합니다.
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // };

  // handleCreateGaldaeConfirm 함수 (주석처리)
  // const handleCreateGaldaeConfirm = async () => {
  //   setCreateGaldaeLoading(true);
  //   // 사용자가 선택한 값들을 조합하여 ISO 8601 형식의 출발일시 생성
  //   const formattedDepartureTime = getFormattedDepartureTime();
  //   if (
  //     departureLargeId === null ||
  //     departureSmallId === null ||
  //     destinationLargeId === null ||
  //     destinationSmallId === null
  //   ) {
  //     Alert.alert('출발지 또는 도착지를 다시 선택해주세요!');
  //     return;
  //   }
  //   const generateGaldaeData: CreatePostRequest = {
  //     subDepartureId: departureSmallId,
  //     majorDepartureId: departureLargeId,
  //     majorArrivalId: destinationLargeId,
  //     subArrivalId: destinationSmallId,
  //     departureTime: formattedDepartureTime,
  //     passengerType: 'DONT_CARE',
  //     arrangeTime: 'POSSIBLE',
  //     passengerCount: 4,
  //     isFavoriteRoute: false,
  //   };
  //   try {
  //     await createPost(generateGaldaeData);
  //     setCreateGaldaePopupVisible(false);
  //     setToastVisible(true);
  //     setCreateGaldaeBoolean(!createGaldaeBoolean);
  //     dispatch(fetchMyGaldaeHistory());
  //     dispatch(fetchMyCreatedGaldae());
  //     dispatch(fetchHomeGaldaePosts());
  //     setTimeout(() => {
  //       setToastVisible(false);
  //     }, 2000);
  //   } catch (error) {
  //     // console.error('❌ 갈대 생성 실패:', error);
  //   } finally {
  //     setCreateGaldaeLoading(false);
  //   }
  // };

  const handleMorePress = () => {
    navigation.navigate('NowGaldae');
  };
  // 빠른 갈대 관련 함수들 (주석처리)
  // const handleTimePopupConfirm = (
  //   selectedDate: string,
  //   amPm: '오전' | '오후',
  //   hour: number,
  //   minute: number,
  // ) => {
  //   setDepartureDate(selectedDate);
  //   setDepartureAmPm(amPm);
  //   setDepartureHour(hour);
  //   setDepartureMinute(minute);
  // };
  //
  // // 출발일시 문자열 포맷 함수
  // const formatDepartureDateTime = () => {
  //   if (!departureDate) {
  //     return '출발 시간 선택';
  //   }
  //   const dateObj = moment(departureDate, 'YYYY-MM-DD');
  //   const formattedDate = dateObj.format('YYYY년 M월 D일 (ddd)');
  //   const formattedTime = `${departureAmPm} ${departureHour} : ${
  //     departureMinute < 10 ? '0' + departureMinute : departureMinute
  //   }`;
  //   return `${formattedDate} ${formattedTime}`;
  // };
  //
  // // 출발일시를 ISO 8601 형식으로 변환하는 함수
  // const getFormattedDepartureTime = (): string => {
  //   if (!departureDate) {
  //     return '출발 시간 선택';
  //   }
  //   let hour24 = departureHour;
  //   if (departureAmPm === '오후' && departureHour < 12) {
  //     hour24 += 12;
  //   } else if (departureAmPm === '오전' && departureHour === 12) {
  //     hour24 = 0;
  //   }
  //   const selectedMoment = moment.utc(departureDate).set({
  //     hour: hour24,
  //     minute: departureMinute,
  //     second: 0,
  //     millisecond: 0,
  //   });
  //   return selectedMoment.toISOString();
  // };
  //
  // const toggleFastGaldaeStartPopup = () => {
  //   fastGaldaeStartPopupRef.current?.open();
  // };
  //
  // const toggleFastGaldaeEndPopup = () => {
  //   fastGaldaeEndPopupRef.current?.open();
  // };
  //
  // const toggleFastGaldaeTimePopup = () => {
  //   fastGaldaeTimePopupRef.current?.open();
  // };
  //
  // const openCreateGaldaePopup = () => {
  //   const formattedDepartureTime = getFormattedDepartureTime();
  //   if (
  //     departureLargeName === '출발지 선택' ||
  //     departureSmallName === '출발지 선택' ||
  //     destinationLargeName === '도착지 선택' ||
  //     destinationSmallName === '도착지 선택'
  //   ) {
  //     Alert.alert('출발지 또는 도착지를 제대로 선택해주세요!');
  //     return;
  //   } else if (formattedDepartureTime === '출발 시간 선택') {
  //     Alert.alert('출발 시간을 선택해주세요!');
  //     return;
  //   }
  //   const departureMoment = moment(formattedDepartureTime.replace(/Z$/, ''));
  //   if (departureMoment.isBefore(moment())) {
  //     Alert.alert('알림', '현재 시간보다 이후의 시간을 선택해주세요!');
  //     return;
  //   }
  //   setgenerateLoading(true);
  //   setgenerateLoading(false);
  //   setCreateGaldaePopupVisible(true);
  // };
  //
  // const closeCreateGaldaePopup = () => {
  //   setCreateGaldaePopupVisible(false);
  // };
  // 포스트 삭제를 위한 핸들러 (본인 글인 경우에만 활성화)
  const handleLongPress = (post: MyCreatedPost | GaldaeItemType) => {
    // 예시로 본인 글 여부는 post.isMine 속성으로 확인
    if (post) {
      //.isMine
      setSelectedPostId(post.postId);
      setDeletePopupVisible(true);
    }
  };
  // handleCreateCaledaeConfirm 함수 (주석처리)
  // const handleCreateCaledaeConfirm = () => {
  //   const formattedDepartureTime = getFormattedDepartureTime();
  //   if (
  //     departureLargeName === '출발지 선택' ||
  //     departureSmallName === '출발지 선택' ||
  //     destinationLargeName === '도착지 선택' ||
  //     destinationSmallName === '도착지 선택'
  //   ) {
  //     Alert.alert('출발지 또는 도착지를 제대로 선택해주세요!');
  //     return;
  //   } else if (formattedDepartureTime === '출발 시간 선택') {
  //     Alert.alert('출발 시간 선택');
  //     return;
  //   }
  //   handleCreateGaldaeConfirm();
  //   closeCreateGaldaePopup();
  //   setToastVisible(true);
  // };
  const handleDeletePost = async () => {
    if (!selectedPostId) {
      return;
    }
    try {
      await deletePost(selectedPostId);
      dispatch(fetchMyCreatedGaldae());
      Alert.alert('삭제 완료', '선택한 갈대가 삭제되었습니다.');
      setDeletePopupVisible(false);
      setSelectedPostId(null);
      dispatch(fetchMyGaldaeHistory());
      dispatch(fetchHomeGaldaePosts());
    } catch (error) {
      Alert.alert('삭제 실패', '글 삭제에 실패했습니다. 다시 시도해주세요.');
      // console.error(error);
    }
  };
  // handleSwitch 함수 (주석처리)
  // const handleSwitch = () => {
  //   setDepartureLargeName(destinationLargeName);
  //   setDepartureSmallName(destinationSmallName);
  //   setDepartureSmallId(destinationSmallId);
  //   setDepartureLargeId(destinationLargeId);
  //   setDestinationLargeId(departureLargeId);
  //   setDestinationSmallId(departureSmallId);
  //   setDestinationLargeName(departureLargeName);
  //   setDestinationSmallName(departureSmallName);
  // };

  return (
    <View style={{height: '100%'}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ScrollView style={styles.container}>
          {/* {myCreatedGaldaeList.length > 0 && (
            <View style={styles.madeGaldaeContainer}>
              <BasicText text="생성한 갈대" style={styles.madeGaldae} />
              {myCreatedGaldaeLoading ? (
                <ActivityIndicator size="large" color={theme.colors.Galdae} />
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={16}>
                  {myCreatedGaldaeList.map((item: any, index: number) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.newGaldaeList}
                      onPress={() =>
                        navigation.navigate('NowGaldaeDetail', {
                          postId: item.postId,
                        })
                      }
                      onLongPress={() => handleLongPress(item)}
                      delayLongPress={100}>
                      <BasicText
                        text={moment(item.createdAt).fromNow()}
                        style={styles.newGaldaeTimeText}
                      />
                      <BasicText
                        text={`${item.departure}`}
                        style={styles.newGaldaeDepartText}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      />
                      <SVG
                        name="arrow_down_fill"
                        style={styles.newGaldaeArrowIcon}
                      />
                      <BasicText
                        text={`${item.arrival}`}
                        style={styles.newGaldaeDestText}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
          )} */}

          {/* 기존 빠른 갈대 섹션 (주석처리) */}
          {/* <BasicText text="빠른 갈대" style={styles.startGaldae} /> */}
          {/* <BasicText */}
          {/*   text="목적지, 시간만 고르고 빠르게 동승자를 구해보세요!" */}
          {/*   style={styles.startGaldaeEx} */}
          {/* /> */}
          {/* <View style={styles.borderedBox}> */}
          {/*   <View style={styles.startAndEnd}> */}
          {/*     <TouchableOpacity */}
          {/*       style={styles.startContain} */}
          {/*       onPress={toggleFastGaldaeStartPopup}> */}
          {/*       <TextTag text="출발지" viewStyle={styles.start} /> */}
          {/*       <BasicText */}
          {/*         text={departureLargeName} */}
          {/*         style={styles.mainPosName} */}
          {/*       /> */}
          {/*       <BasicText */}
          {/*         text={departureSmallName} */}
          {/*         style={styles.subPosName} */}
          {/*       /> */}
          {/*     </TouchableOpacity> */}
          {/*     <SVGButton */}
          {/*       iconName="Switch" */}
          {/*       buttonStyle={styles.switchBtn} */}
          {/*       SVGStyle={styles.switchIcon} */}
          {/*       onPress={handleSwitch} */}
          {/*     /> */}
          {/*     <TouchableOpacity */}
          {/*       style={styles.startContain} */}
          {/*       onPress={toggleFastGaldaeEndPopup}> */}
          {/*       <TextTag text="도착지" viewStyle={styles.start} /> */}
          {/*       <BasicText */}
          {/*         text={destinationLargeName} */}
          {/*         style={styles.mainPosName} */}
          {/*       /> */}
          {/*       <BasicText */}
          {/*         text={destinationSmallName} */}
          {/*         style={styles.subPosName} */}
          {/*       /> */}
          {/*     </TouchableOpacity> */}
          {/*   </View> */}
          {/*   <View style={styles.line} /> */}
          {/*   <TouchableOpacity */}
          {/*     onPress={toggleFastGaldaeTimePopup} */}
          {/*     style={styles.startContainer}> */}
          {/*     <BasicText text="출발일시" style={styles.startTime} /> */}
          {/*     <BasicText */}
          {/*       text={formatDepartureDateTime()} */}
          {/*       style={styles.startDateTime} */}
          {/*     /> */}
          {/*   </TouchableOpacity> */}
          {/* </View> */}
          {/* <BasicButton */}
          {/*   text="생성하기" */}
          {/*   onPress={openCreateGaldaePopup} */}
          {/*   loading={generateLoading} */}
          {/*   buttonStyle={styles.generateButton} */}
          {/*   textStyle={styles.generateText} */}
          {/* /> */}

          {/* 새로운 서비스 섹션 */}
          <BasicText text="내 서비스" style={styles.serviceTitle} />
          <View style={styles.serviceContainer}>
            <ServiceButton
              iconName="Taxi"
              text="택시비 N빵"
              onPress={() => navigation.navigate('TaxiNDivide')}
            />
            <ServiceButton
              iconName="Ott"
              text="구독료 N빵"
              customStyle={{paddingLeft: 6}}
              onPress={() => navigation.navigate('OTTNDivide')}
            />
            <ServiceButton
              iconName="Delivery"
              text="배달 N빵"
              onPress={() => navigation.navigate('DeliveryNDivide')}
            />
          </View>

          <TouchableOpacity style={styles.nowGaldaeTitle} onPress={handleMorePress}>
            <BasicText text="실시간 N빵" style={styles.nowGaldae} onPress={handleMorePress}/>
            <SVGButton
              iconName="MoreIcon"
              onPress={handleMorePress}
            />
          </TouchableOpacity>

          <View style={styles.nowGaldaeList}>
            {postsLoading ? (
              <ActivityIndicator size="small" color={theme.colors.Galdae} />
            ) : posts.length === 0 ? (
              <View style={styles.noData}>
                <SVG name="information_line" />
                <BasicText text="갈대가 없습니다" color={theme.colors.grayV1} />
              </View>
            ) : (
              posts.map(item => (
                <TaxiItem
                  key={item.postId}
                  item={item}
                  onPress={
                    !item.isSameGender && item.passengerGenderType === 'SAME'
                      ? () => setSameGenderPopupVisible(true)
                      : () =>
                          navigation.navigate('NowGaldaeDetail', {
                            postId: item.postId,
                          })
                  }
                  onLongPress={() => handleLongPress(item)}
                />
              ))
            )}
          </View>
        </ScrollView>
      </ScrollView>

      {/* 빠른 갈대 Portal들 (주석처리) */}
      {/* <Portal> */}
      {/*   <FastGaldaeStartPopup */}
      {/*     ref={fastGaldaeStartPopupRef} */}
      {/*     onConfirm={(largeName, largeId, smallName, smallId) => { */}
      {/*       setDepartureLargeName(largeName); */}
      {/*       setDepartureLargeId(largeId); */}
      {/*       setDepartureSmallName(smallName); */}
      {/*       setDepartureSmallId(smallId); */}
      {/*     }} */}
      {/*     selectedStartPlaceId={destinationSmallId} */}
      {/*   /> */}
      {/* </Portal> */}
      {/* <Portal> */}
      {/*   <FastGaldaeEndPopup */}
      {/*     ref={fastGaldaeEndPopupRef} */}
      {/*     onConfirm={(largeName, largeId, smallName, smallId) => { */}
      {/*       setDestinationLargeName(largeName); */}
      {/*       setDestinationLargeId(largeId); */}
      {/*       setDestinationSmallName(smallName); */}
      {/*       setDestinationSmallId(smallId); */}
      {/*     }} */}
      {/*     selectedStartPlaceId={departureSmallId} */}
      {/*   /> */}
      {/* </Portal> */}
      {/* <Portal> */}
      {/*   <FastGaldaeTimePopup */}
      {/*     ref={fastGaldaeTimePopupRef} */}
      {/*     onConfirm={handleTimePopupConfirm} */}
      {/*   /> */}
      {/* </Portal> */}

      {/* CreateGaldae Popup (주석처리) */}
      {/* <CreateGaldaePopup */}
      {/*   loading={createGaldaeLoading} */}
      {/*   visible={createGaldaePopupVisible} */}
      {/*   onCancel={closeCreateGaldaePopup} */}
      {/*   onConfirm={handleCreateCaledaeConfirm} */}
      {/*   departureDateTime={formatDepartureDateTime()} // Home.tsx의 출발일시 포맷 함수 결과 */}
      {/*   departureLocation={departureSmallName} // 출발지 소분류 (예: "정문") */}
      {/*   destination={destinationSmallName} // 도착지 소분류 (예: "던킨도너츠") */}
      {/* /> */}
      {/* <FloatingButton onPress={() => navigation.navigate('CreateGaldae')} /> */}
      <ToastPopup
        visible={toastVisible}
        text="갈대가 생성되었습니다!"
        onDismiss={() => setToastVisible(false)}
      />
      <NowGaldaeSameGender
        visible={sameGenderPopupVisible}
        onConfirm={() => {
          setSameGenderPopupVisible(false);
        }}
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

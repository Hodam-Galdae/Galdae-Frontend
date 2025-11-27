/* eslint-disable react-native/no-inline-styles */
// MyInfo.tsx 테스트
import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Image, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import SVG from '../components/SVG';
import styles from '../styles/MyInfo.style';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
//import BasicButton from '../components/button/BasicButton';
import BasicText from '../components/BasicText';
import useImagePicker from '../hooks/useImagePicker';
import SVGButton from '../components/button/SVGButton';
import SVGTextButton from '../components/button/SVGTextButton';
//import moment from 'moment-timezone';
import { theme } from '../styles/theme';
//import DeletePopup from '../components/popup/DeletePopup';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../modules/redux/store';
import { RootState } from '../modules/redux/RootReducer'; // RootState 타입 (store 설정에 따라 경로 수정)
import { fetchUserInfo } from '../modules/redux/slice/myInfoSlice';
import LogoutPopup from '../components/popup/LogoutPopup';
//API
import { updateMemberImage, logoutMember } from '../api/membersApi';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BasicButton from '../components/button/BasicButton';
//import { deletePost } from '../api/postApi';
//type
// import { MyPostHistory } from '../types/getTypes';

// 내비게이션 스택 타입 정의
type RootStackParamList = {
  Payment: undefined;
  MyGaldae: undefined;
  NicknameChange: { nickname: string }; // 수정: 닉네임을 받음
  Announcement: undefined;
  UserGuide: undefined;
  TermsOfUse: undefined;
  FAQ: undefined;
  WithDraw: undefined;
  Login: undefined;
  NowGaldaeDetail: { postId: string };
  OnboardingGuide: undefined;
  SignUp: { data: boolean };
  ContinueSignUp: undefined;
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const MyInfo: React.FC = () => {
  const [logoutPopupVisible, setLogoutPopupVisible] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [guestUniversity, setGuestUniversity] = useState('대학');
  const [guestUniversityArea, setGuestUniversityArea] = useState('캠퍼스');
  const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
  const userState = useSelector((state: RootState) => state.user);

  const myInfoMenu = [
    { text: '결제 · 정산관리', onPress: () => { navigation.navigate('Payment'); } },
    { text: '공지 사항', onPress: () => { navigation.navigate('Announcement'); } },
    { text: '이용 가이드', onPress: () => { navigation.navigate('OnboardingGuide'); } },
    { text: '이용약관', onPress: () => { navigation.navigate('TermsOfUse'); } },
    { text: 'FAQ/문의하기', onPress: () => { navigation.navigate('FAQ'); } },
    { text: '로그아웃', onPress: () => { setLogoutPopupVisible(true); } },
    { text: '탈퇴', onPress: () => { navigation.navigate('WithDraw'); } },
  ];
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useAppDispatch();
  const [isImageLoading, setIsImageLoading] = useState(false); // 이미지 업데이트 로딩 상태
  // const [deletePopupVisible, setDeletePopupVisible] = useState<boolean>(false);
  //const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  //const [profileImg, setProfileImg] = useState<string>('');
  const { imageUri, getImageByGallery } = useImagePicker();

  // Redux에서 사용자 정보 가져오기
  const userInfo = useSelector((state: RootState) => state.myInfoSlice.userInfo);
  const profileImg = userInfo?.image || '';
  // 내 갈대 기록은 Redux slice에서 관리 (state.myGaldae)
  // const { history: myGaldaeHistory, loading: historyLoading } = useSelector(
  //   (state: RootState) => state.myGaldaeSlice
  // );

  // 로컬 대학 정보 불러오기 (항상 실행)
  useEffect(() => {
    const loadLocalUniversityInfo = async () => {
      try {
        const savedUniversity = await AsyncStorage.getItem('selectedUniversity');
        const savedUniversityArea = await AsyncStorage.getItem('selectedUniversityArea');

        console.log('📖 [MyInfo] 로컬 대학 정보 불러오기:', { savedUniversity, savedUniversityArea });

        if (savedUniversity) {
          setGuestUniversity(savedUniversity);
        }
        if (savedUniversityArea) {
          setGuestUniversityArea(savedUniversityArea);
        }
      } catch (error) {
        console.error('❌ [MyInfo] 로컬 대학 정보 불러오기 실패:', error);
      }
    };
    loadLocalUniversityInfo();
  }, []);

  // 사용자 인증 상태 확인
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = await EncryptedStorage.getItem('accessToken');
        // 닉네임이 비어있어도 id가 있으면 인증된 사용자로 간주
        const hasUserInfo = userState.id !== '';
        const authenticated = !!(accessToken && hasUserInfo);

        console.log('🔍 [MyInfo] 인증 상태 체크:', {
          hasAccessToken: !!accessToken,
          userId: userState.id,
          userNickname: userState.nickname,
          hasUserInfo,
          finalAuth: authenticated
        });

        setIsAuthenticated(authenticated);
      } catch (error) {
        console.error('❌ [MyInfo] 인증 상태 확인 실패:', error);
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, [userState]);



  // 초기 마운트 시 유저 정보 fetch
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  // 화면 포커스될 때마다 최신 유저 정보 재호출
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchUserInfo());
    }, [dispatch])
  );

  // const handleMorePress = () => {
  //   navigation.navigate('MyGaldae');
  // };



  // 포스트 삭제를 위한 핸들러 (본인 글인 경우에만 활성화)
  // const handleLongPress = (post: MyPostHistory) => {
  //   // 예시로 본인 글 여부는 post.isMine 속성으로 확인
  //   if (post) { //.isMine
  //     setSelectedPostId(post.postId);
  //     setDeletePopupVisible(true);
  //   }
  // };


  // imageUri가 변경되면 updateMemberImage API 호출
  useEffect(() => {
    const updateImage = async () => {
      try {
        if (imageUri) {
          setIsImageLoading(true);
          console.log(`📸 프로필 이미지 변경: ${imageUri}`);
          await updateMemberImage(imageUri);
          console.log('✅ 프로필 이미지 업데이트 성공');
          // 이미지 업데이트 후 사용자 정보를 재갱신
          dispatch(fetchUserInfo());
        }
      } catch (error) {
        console.error('❌ 프로필 이미지 업데이트 실패:', error);
        Alert.alert('오류', '프로필 이미지를 업데이트하는데 실패했습니다.');
      } finally {
        setIsImageLoading(false);
      }
    };

    updateImage();
  }, [imageUri, dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(fetchUserInfo());
    setRefreshing(false);
  };
  // const handleDeletePost = async () => {
  //   if (!selectedPostId) { return; }
  //   try {
  //     await deletePost(selectedPostId);
  //     dispatch(fetchMyGaldaeHistory());
  //     dispatch(fetchMyCreatedGaldae());
  //     dispatch(fetchHomeGaldaePosts());

  //     //Alert.alert('삭제 완료', '선택한 갈대가 삭제되었습니다');
  //     setDeletePopupVisible(false);
  //     setSelectedPostId(null);
  //   } catch (error) {
  //     Alert.alert('삭제 실패', '글 삭제에 실패했습니다. 다시 시도해주세요.');
  //     //console.error(error);
  //   }
  // };

  const handleLogout = async () => {
    setLogoutPopupVisible(false);
    try {
      await logoutMember();
      // 로그아웃 성공 시, 상태 초기화 후 로그인 화면으로 이동하거나 적절히 처리합니다.
      Alert.alert('로그아웃', '정상적으로 로그아웃 되었습니다');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('로그아웃 실패', '로그아웃에 실패하였습니다. 다시 시도해주세요.');
    }
  };
  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* <BasicButton
          text="어플 공지사항/안내"
          //onPress={handlePress}
          //loading={loading}
          buttonStyle={styles.notiButton}
          textStyle={styles.notiText}
        /> */}
        <ScrollView style={styles.container}>
          <BasicText
            text={isAuthenticated ? `${userInfo?.nickname || ''}의 갈대` : '게스트님의 갈대'}
            style={styles.startGaldae}
          />

          <View style={styles.userInfoBox}>
            <View style={styles.userInfos}>
              <View style={styles.profile}>
                {isAuthenticated ? (
                  <>
                    {isImageLoading ? (
                      <View style={[styles.profileImg, { justifyContent: 'center', alignItems: 'center' }]}>
                        <ActivityIndicator size="small" color={theme.colors.Galdae} />
                      </View>
                    ) : (profileImg || imageUri) ? (
                      <Image source={{ uri: profileImg || imageUri }} style={styles.profileImg} resizeMode="cover" />
                    ) : (
                      <SVG name="MyInfoDefaultProfile" style={styles.profileImg} />
                    )}
                    <SVGButton iconName="camera_2_line" buttonStyle={styles.profileCamera} onPress={getImageByGallery} />
                  </>
                ) : (
                  <SVG name="MyInfoDefaultProfile" style={styles.profileImg} />
                )}
              </View>
              <View style={styles.userInfoText}>
                <BasicText
                  text={
                    isAuthenticated
                      ? (userInfo?.university && userInfo?.area ? `${userInfo.university} - ${userInfo.area}` : '')
                      : `${guestUniversity} - ${guestUniversityArea}`
                  }
                  style={styles.universityText}
                />
                <View style={styles.profileName}>
                  {isAuthenticated ? (
                    <>
                      <BasicText
                        text={userInfo?.nickname || ''}
                        style={styles.nameText}
                        onPress={() =>
                          navigation.navigate('NicknameChange', {
                            nickname: userInfo?.nickname || '',
                          })
                        }
                      />
                      <SVG name={userInfo?.gender === 'MALE' ? 'male' : userInfo?.gender === 'FEMALE' ? 'female' : 'GenderSecret'} style={styles.genderIcon} />
                      <SVGButton
                        iconName="edit_line"
                        onPress={() =>
                          navigation.navigate('NicknameChange', {
                            nickname: userInfo?.nickname || '',
                          })
                        }
                      />
                    </>
                  ) : (
                    <BasicButton
                      text="내 프로필 완성하기"
                      buttonStyle={styles.guestProfileButton}
                      textStyle={styles.guestProfileButtonText}
                      enabledColors={{
                        backgroundColor: theme.colors.white,
                        textColor: theme.colors.blue,
                        borderColor: theme.colors.blue,
                      }}
                      onPress={() => navigation.navigate('ContinueSignUp')}
                    />
                  )}
                </View>
              </View>
            </View>
            {/* {userInfo?.isAuthenticated && <SVG name="Badge" style={styles.badge} />} */}
          </View>

          {/* <View style={styles.nowGaldaeTitle}>
            <BasicText text="내 갈대기록" style={styles.nowGaldae} />
            <SVGTextButton
              iconName="More"
              text="더보기"
              textStyle={styles.more}
              iconPosition="right"
              onPress={handleMorePress}
              enabledColors={{
                backgroundColor: 'transparent',
                textColor: theme.colors.grayV1,
                borderColor: 'transparent',
              }}
            />
          </View> */}
          {/* {historyLoading ? (
            <ActivityIndicator size="large" color={theme.colors.Galdae} />
          ) : myGaldaeHistory.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
              {myGaldaeHistory.map((list, index) => {
                const isPassed = moment(list.departureTime.replace(/Z$/, '')).isBefore(moment());

                return (
                  <TouchableOpacity key={index} style={isPassed ? styles.newGaldaeListPassed : styles.newGaldaeList} onPress={() => navigation.navigate('NowGaldaeDetail', { postId: list.postId })} onLongPress={() => handleLongPress(list)} delayLongPress={100}>
                    <BasicText text={moment(list.createAt).fromNow()} style={isPassed ? styles.newGaldaeTimeTextPassed : styles.newGaldaeTimeText} />
                    <BasicText text={`${list.departure.subPlace}`} style={isPassed ? styles.newGaldaeDepartTextPassed : styles.newGaldaeDepartText} numberOfLines={1} ellipsizeMode="tail" />
                    {
                      isPassed ? (
                        <SVG name="arrow_down_fill_gray2" style={styles.newGaldaeArrowIcon} />
                      ) : (
                        <SVG name="arrow_down_fill" style={styles.newGaldaeArrowIcon} />
                      )
                    }
                    <BasicText text={`${list.arrival.subPlace}`} style={isPassed ? styles.newGaldaeDestTextPassed : styles.newGaldaeDestText} numberOfLines={1} ellipsizeMode="tail" />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : (
            <BasicText text="갈대 기록이 없습니다." />
          )} */}



          <BasicText text="서비스 설정" style={styles.myInfoTitle} />
          <View style={styles.myInfos}>
            {myInfoMenu.map((menu, index) => {
              if (index === 0) {
                console.log('🎨 [MyInfo] 메뉴 렌더링 - isAuthenticated:', isAuthenticated, 'disabled:', !isAuthenticated);
              }
              return (
                <SVGTextButton
                  key={menu.text}
                  text={menu.text}
                  iconName="right_line"
                  iconPosition="right"
                  style={styles.search}
                  textStyle={styles.searchText}
                  SVGStyle={[styles.searchSVG, !isAuthenticated && { opacity: 0.4 }]}
                  enabledColors={{
                    backgroundColor: theme.colors.white,
                    textColor: theme.colors.blackV0,
                  }}
                  disabledColors={{
                    backgroundColor: theme.colors.white,
                    textColor: theme.colors.grayDisabled,
                  }}
                  onPress={menu.onPress}
                  disabled={!isAuthenticated}
                />
              );
            })}
          </View>
        </ScrollView>
      </ScrollView>
      <LogoutPopup
        visible={logoutPopupVisible}
        onCancel={() => setLogoutPopupVisible(false)}
        onConfirm={handleLogout}
      />
    </View>
  );
};

export default MyInfo;


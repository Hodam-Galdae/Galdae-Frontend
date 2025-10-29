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
import { resizeImage } from '../utils/ImageResizer';
//API
import { updateMemberImage, logoutMember } from '../api/membersApi';
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
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const MyInfo: React.FC = () => {
  const [logoutPopupVisible, setLogoutPopupVisible] = useState<boolean>(false);
  const myInfoMenu = [
    { text: '결제 · 정산관리', onPress: () => { navigation.navigate('Payment'); } },
    { text: '공지 사항', onPress: () => { navigation.navigate('Announcement'); } },
    { text: '이용 가이드', onPress: () => { navigation.navigate('UserGuide'); } },
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
  const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
  //const [profileImg, setProfileImg] = useState<string>('');
  const { imageUri, getImageByGallery } = useImagePicker();

  // Redux에서 사용자 정보 가져오기
  const userInfo = useSelector((state: RootState) => state.myInfoSlice.userInfo);
  const profileImg = userInfo?.image || '';
  // 내 갈대 기록은 Redux slice에서 관리 (state.myGaldae)
  // const { history: myGaldaeHistory, loading: historyLoading } = useSelector(
  //   (state: RootState) => state.myGaldaeSlice
  // );



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


  // imageUri가 변경되면 imageBase64를 사용해서 updateMemberImage API 호출
  useEffect(() => {
    const updateImage = async () => {
      try {
        if (imageUri) {
          setIsImageLoading(true);
          //console.log(`imageUri: ${imageUri}`);
          const resizedImage = await resizeImage(imageUri, 800, 800, 'profile.jpg');
          await updateMemberImage(resizedImage.uri);
          //console.log('✅ 이미지 업데이트 성공:', result);
          // 이미지 업데이트 후 사용자 정보를 재갱신
          dispatch(fetchUserInfo());

        }
      } catch (error) {
        //console.error('❌ 이미지 업데이트 실패:', error);
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
    // 실제 프로젝트에서는 토큰을 Redux나 AsyncStorage 등에서 가져옵니다.
    const token = 'Bearer your-access-token'; // 실제 엑세스 토큰으로 대체
    try {
      await logoutMember(token);
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
          <BasicText text={`${userInfo?.nickname}의 갈대`} style={styles.startGaldae} />

          <View style={styles.userInfoBox}>
            <View style={styles.userInfos}>
              <View style={styles.profile}>
                {isImageLoading ? (
                  <View style={[styles.profileImg, { justifyContent: 'center', alignItems: 'center' }]}>
                    <ActivityIndicator size="small" color={theme.colors.Galdae} />
                  </View>
                ) : profileImg ? (
                  <Image source={{ uri: profileImg }} style={styles.profileImg} resizeMode="cover" />
                ) : imageUri ? (
                  <Image source={{ uri: imageUri }} style={styles.profileImg} resizeMode="cover" />
                ) : (
                  <SVG name="MyInfoDefaultProfile" style={styles.profileImg} />
                )}
                <SVGButton iconName="camera_2_line" buttonStyle={styles.profileCamera} onPress={getImageByGallery} />
              </View>
              <View style={styles.userInfoText}>
                <BasicText text={`${userInfo?.university} - ${userInfo?.area} `} style={styles.universityText} />
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
                  <SVG name={ userInfo?.gender === 'MALE' ? 'male' :  userInfo?.gender === 'FEMALE' ? 'female' : 'GenderSecret' } style={styles.genderIcon} /> {/** 추후에는 성별에 따른 아이콘 적용해야 함 */}
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
            {myInfoMenu.map(menu => (
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
                    backgroundColor: theme.colors.white,
                    textColor: theme.colors.grayV2,
                  }
                }
                onPress={menu.onPress}
              />
            ))}
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


import React, { useState,useEffect } from 'react';
import { Alert,View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/MyGaldae.style';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import { theme } from '../../styles/theme';
import SVGTextButton from '../../components/button/SVGTextButton';
import BasicButton from '../../components/button/BasicButton';
import MyGaldaeItem from '../../components/MyGaldaeItem';
import FrequentRouteItem from '../../components/FrequentRouteItem';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {  useSelector } from 'react-redux';
import { useAppDispatch } from '../../modules/redux/store';
import {fetchMyGaldaeHistory} from '../../modules/redux/slice/myGaldaeSlice';
import {fetchHomeGaldaePosts} from  '../../modules/redux/slice/homeGaldaeSlice';
import { fetchMyCreatedGaldae } from '../../modules/redux/slice/myCreatedGaldaeSlice';
import { fetchGaldaePosts } from '../../modules/redux/slice/galdaeSlice';
import { fetchFrequentRoutes } from '../../modules/redux/slice/frequentRouteSlice';
import { RootState } from '../../modules/redux/RootReducer';
import { MyPostHistory } from '../../types/getTypes';
import DeletePopup from '../../components/popup/DeletePopup';
import { deletePost } from '../../api/postApi';
//type
import { GetPostsRequest } from '../../types/postTypes';
type HomeProps = {
  navigation: any;
};

type RootStackParamList = {
  CreateGaldae: undefined;
  NowGaldae: {
    departureLarge?: string;
    departureSmall?: string;
    destinationLarge?: string;
    destinationSmall?: string;
  };
  SetDestination: undefined;
  MyGaldaeHistory: any;
  NowGaldaeDetail: { postId: string };
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MyGaldae: React.FC<HomeProps> = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  // Redux에서 자주 가는 경로 데이터 가져오기 (인터페이스는 departure, arrival, createdAt 등)
  const { routes, loading, error } = useSelector((state: RootState) => state.frequentSlice);
  // 내 갈대 기록은 Redux slice에서 관리 (state.myGaldae)
  const { history: myGaldaeHistory, totalCount} = useSelector(
    (state: RootState) => state.myGaldaeSlice
  );


  useEffect(() => {
    dispatch(fetchFrequentRoutes());
  }, [dispatch]);


  const handleMorePress = () => {
    navigation.navigate('MyGaldaeHistory');
  };
  const handleLongPress = (post: MyPostHistory) => {
    // 예시로 본인 글 여부는 post.isMine 속성으로 확인
    if (post) { //.isMine
      setSelectedPostId(post.postId);
      setDeletePopupVisible(true);
    }
  };
  const handleDeletePost = async () => {
      if (!selectedPostId) {return;}
      try {
        await deletePost(selectedPostId);
        dispatch(fetchMyGaldaeHistory());
         dispatch(fetchMyCreatedGaldae());
              dispatch(fetchHomeGaldaePosts());
              dispatch(fetchFrequentRoutes());
              const params: GetPostsRequest = {
                      pageNumber: 0,
                      pageSize: 20,
                      direction: 'DESC' ,
                      properties:  ['createAt'] ,
                    };
             dispatch(fetchGaldaePosts(params));
        Alert.alert('삭제 완료', '선택한 갈대가 삭제되었습니다.');
        setDeletePopupVisible(false);
        setSelectedPostId(null);
      // eslint-disable-next-line no-catch-shadow, @typescript-eslint/no-shadow
      } catch (error) {
        Alert.alert('삭제 실패', '글 삭제에 실패했습니다. 다시 시도해주세요.');
        //console.error(error);
      }
    };


// 내 갈대 기록의 첫 번째 항목을 topItem으로 사용 (있다면)
const topItem = myGaldaeHistory.length > 0 ? myGaldaeHistory[0] : null;
  return (
    <View style={styles.container}>
      <Header
        leftButton={<SVGButton iconName="arrow_left_line" onPress={() => navigation.goBack()} />}
        title={<BasicText text="내 갈대 기록" style={styles.headerText} />}
      />

      <View style={styles.content}>
        <View style={styles.nowGaldaeTitle}>
          <BasicText text={`${totalCount}개의 경로`} style={styles.nowGaldae} />
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

        {topItem ? (
          <MyGaldaeItem
            item={topItem}
            onPress={() => navigation.navigate('NowGaldaeDetail', {postId: topItem.postId})}
            onLongPress={() => handleLongPress(topItem)}
          />
        ) : (
          <View style={styles.borderBox}>
            <BasicText text="갈대가 없습니다" style={styles.noGaldaeText} />
          </View>
        )}

        <BasicText text="자주가는 경로" style={styles.freqText} />
        {loading ? (
          <BasicText text="로딩중..." style={styles.noGaldaeText} />
        ) : error ? (
          <BasicText text={`오류: ${error}`} style={styles.noGaldaeText} />
        ) : (
          <FlatList
            style={styles.searchList}
            data={routes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <FrequentRouteItem key={item.createdAt} routeData={item} />
            )}
            ListEmptyComponent={
              <View style={styles.borderBox}>
                <BasicText text="기록이 없습니다" style={styles.noGaldaeText} />
              </View>
            }
          />
        )}

        <BasicButton
          text="갈대 생성하기"
          buttonStyle={styles.generateButton}
          textStyle={styles.generateText}
          onPress={() => navigation.navigate('CreateGaldae')}
        />
      </View>
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

export default MyGaldae;

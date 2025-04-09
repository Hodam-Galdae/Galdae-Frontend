import React,{useState} from 'react';
import { Alert, View ,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/MyGaldaeHistory.style';
import Header from '../../components/Header';
import SVGButton from '../../components/button/SVGButton';
import BasicText from '../../components/BasicText';
import SVG from '../../components/SVG';
import MyGaldaeItem from '../../components/MyGaldaeItem';
import { theme } from '../../styles/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DeletePopup from '../../components/popup/DeletePopup';
import {  useSelector } from 'react-redux';
import { useAppDispatch } from '../../modules/redux/store';
import { fetchMyGaldaeHistory } from '../../modules/redux/slice/myGaldaeSlice';
import {fetchHomeGaldaePosts} from  '../../modules/redux/slice/homeGaldaeSlice';
import { fetchMyCreatedGaldae } from '../../modules/redux/slice/myCreatedGaldaeSlice';
import { fetchGaldaePosts } from '../../modules/redux/slice/galdaeSlice';
import { fetchFrequentRoutes } from '../../modules/redux/slice/frequentRouteSlice';
import { RootState } from '../../modules/redux/RootReducer';
import { MyPostHistory } from '../../types/getTypes';
import { deletePost } from '../../api/postApi';
//type
import { GetPostsRequest } from '../../types/postTypes';
type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
};
// 내비게이션 스택 타입 정의
type RootStackParamList = {
    CreateGaldae: undefined;
    NowGaldae: {
      departureLarge?:string,
      departureSmall?:string,
      destinationLarge?:string,
      destinationSmall?:string,
    };
    NowGaldaeDetail: { postId: string };
    SetDestination:undefined;
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MyGaldaeHistory: React.FC<HomeProps> = () => {
    const dispatch = useAppDispatch();
    const [deletePopupVisible, setDeletePopupVisible] = useState<boolean>(false);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

    // 내 갈대 기록은 Redux slice에서 관리 (state.myGaldae)
  const { history: myGaldaeHistory} = useSelector(
    (state: RootState) => state.myGaldaeSlice
  );

    // 포스트 삭제를 위한 핸들러 (본인 글인 경우에만 활성화)
    const handleLongPress = (post: MyPostHistory) => {
      // 예시로 본인 글 여부는 post.isMine 속성으로 확인
      if (post) { //.isMine
        setSelectedPostId(post.postId);
        setDeletePopupVisible(true);
      }
    };
    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const goBack = () => navigation.goBack();
    // [FlatList] 데이터가 없을 때 표시할 내용 (ListEmptyComponent)
    const renderEmptyComponent = () => (
      <View style={styles.noData}>
        <SVG name="information_line" />
        <BasicText text="갈대가 없습니다" color={theme.colors.gray1} />
      </View>
    );
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
                      properties:  ['create_at'] ,
                    };
             dispatch(fetchGaldaePosts(params));

        Alert.alert('삭제 완료', '선택한 갈대가 삭제되었습니다.');
        setDeletePopupVisible(false);
        setSelectedPostId(null);
      } catch (error) {
        Alert.alert('삭제 실패', '글 삭제에 실패했습니다. 다시 시도해주세요.');
        //console.error(error);
      }
  };
    // [FlatList] 각 항목 렌더링
    const renderGaldaeItem = ({ item }: { item: typeof myGaldaeHistory[0] }) => (
      <MyGaldaeItem
        item={item}
        onLongPress={() => handleLongPress(item)}
        onPress={() => navigation.navigate('NowGaldaeDetail', {postId: item.postId})}
      />
    );
  return (
    <View style={styles.main}>
        <Header
        leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack}/>}
        title={<BasicText text="내 갈대 기록" style={styles.headerText}/>}
        />



             <View style={styles.galdaeList}>
              <FlatList
                contentContainerStyle={styles.nowGaldaeList}
                data={myGaldaeHistory}
                renderItem={renderGaldaeItem}
                ListEmptyComponent={renderEmptyComponent}
              />
             </View>
             {/* ➏ DeletePopup 연결 */}
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

export default MyGaldaeHistory;


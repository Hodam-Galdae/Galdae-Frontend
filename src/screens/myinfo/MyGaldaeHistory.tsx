import React,{useState} from 'react';
import {  View ,FlatList} from 'react-native';
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
import { RootState } from '../../modules/redux/RootReducer';
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
    const [deletePopupVisible, setDeletePopupVisible] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    // 내 갈대 기록은 Redux slice에서 관리 (state.myGaldae)
  const { history: myGaldaeHistory} = useSelector(
    (state: RootState) => state.myGaldaeSlice
  );
    // const dummyGaldaeData = [
    //     {
    //       id: 1,
    //       owner: '하재연님의 갈대',
    //       from: { main: '학교', sub: '정문' },
    //       users: 2,
    //       capacity: 4,
    //       destination: { main: '학교', sub: '정문' },
    //       time: '2025년 00월 00일 (0) 00 : 00',
    //       timeAgreement: true,
    //       tags: ['성별무관'],
    //       timestamp: 1735689600000, // 예시 타임스탬프 (밀리초 단위)
    //     },
    //     {
    //       id: 2,
    //       owner: '김철수의 갈대',
    //       from: { main: '후문', sub: '대학' },
    //       users: 1,
    //       capacity: 3,
    //       destination: { main: '스타벅스', sub: '시내' },
    //       time: '2025년 01월 01일 (목) 10 : 30',
    //       timeAgreement: false,
    //       tags: ['남자만'],
    //       timestamp: 1735689600001, // 예시 타임스탬프 (밀리초 단위)
    //     },
    //     {
    //       id: 3,
    //       owner: '이영희의 갈대',
    //       from: { main: '정문', sub: '회사' },
    //       users: 1,
    //       capacity: 2,
    //       destination: { main: '공원', sub: '주변' },
    //       time: '2025년 02월 02일 (일) 14 : 00',
    //       timeAgreement: true,
    //       tags: ['성별무관'],
    //       timestamp: 1735689600002, // 예시 타임스탬프 (밀리초 단위)
    //     },
    //     {
    //         id: 4,
    //         owner: '최희연의 갈대',
    //         from: { main: '호담', sub: '여기는어디야' },
    //         users: 1,
    //         capacity: 3,
    //         destination: { main: '가천대학교', sub: '무당이정거장' },
    //         time: '2025년 02월 13일 (일) 15 : 00',
    //         timeAgreement: true,
    //         tags: ['여자만'],
    //         timestamp: 1735689600003, // 예시 타임스탬프 (밀리초 단위)
    //       },
    //       {
    //         id: 5,
    //         owner: '이서준의 갈대',
    //         from: { main: '호담', sub: '여기는어디야' },
    //         users: 1,
    //         capacity: 3,
    //         destination: { main: '가천대학교', sub: '무당이정거장' },
    //         time: '2025년 02월 13일 (일) 15 : 00',
    //         timeAgreement: true,
    //         tags: ['여자만'],
    //         timestamp: 1735689600004, // 예시 타임스탬프 (밀리초 단위)
    //       },
    //   ];
    // ➋ 삭제 팝업 ‘확인’ 버튼 누를 시 실행될 로직
    const handleConfirmDelete = () => {
       // TODO: 실제 삭제 로직 (예: API 요청, state에서 아이템 제거 등)
       console.log('선택된 아이템 삭제:', selectedItem);

       // 팝업 닫기
       setDeletePopupVisible(false);
       setSelectedItem(null);
     };

     // ➌ 삭제 팝업 ‘취소’ 버튼 누를 시
     const handleCancelDelete = () => {
       setDeletePopupVisible(false);
       setSelectedItem(null);
     };

    const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
    const goBack = () => navigation.goBack();
    // [FlatList] 데이터가 없을 때 표시할 내용 (ListEmptyComponent)
    const renderEmptyComponent = () => (
      <View style={styles.noData}>
        <SVG name="information_line" />
        <BasicText text="갈대가 없습니다." color={theme.colors.gray1} />
      </View>
    );

    // [FlatList] 각 항목 렌더링
    const renderGaldaeItem = ({ item }: { item: typeof myGaldaeHistory[0] }) => (
      <MyGaldaeItem
        item={item}
        onLongPress={() => {
          setSelectedItem(item);
          setDeletePopupVisible(true);
        }}
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
              onCancel={handleCancelDelete}
              onConfirm={handleConfirmDelete}
            />

    </View>
  );
};

export default MyGaldaeHistory;


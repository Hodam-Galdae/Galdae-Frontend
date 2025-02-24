// MyInfo.tsx 테스트
import React,{useState} from 'react';
import { View,ScrollView,Image } from 'react-native';
import SVG from '../components/SVG';
import styles from '../styles/MyInfo.style';
import { useNavigation } from '@react-navigation/native';
import BasicButton from '../components/button/BasicButton';
import BasicText from '../components/BasicText';
import SVGButton from '../components/button/SVGButton';
import SVGTextButton from '../components/button/SVGTextButton';
import { theme } from '../styles/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// 내비게이션 스택 타입 정의
type RootStackParamList = {
  Payment: undefined;
  MyGaldae:undefined;
};

type nowGaldaeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const MyInfo: React.FC = () => {
  const newGaldaeList = [
    { time: '방금전', dest: '충주 터미널', depart: '정문' },
    { time: '1일전', dest: '충주역', depart: '학교' },
    { time: '2일전', dest: '시청', depart: '정문' },
    { time: '3일전', dest: '마트', depart: '학교' },
    { time: '4일전', dest: '공원', depart: '후문' },
    { time: '5일전', dest: '카페', depart: '도서관' },
    { time: '6일전', dest: '병원', depart: '정문' },
    { time: '7일전', dest: '은행', depart: '학교' },
    { time: '8일전', dest: '백화점', depart: '후문' },
    { time: '9일전', dest: '기차역', depart: '정문' },
    { time: '10일전', dest: '공항', depart: '터미널' },
    { time: '11일전', dest: '도서관', depart: '후문' },
    { time: '12일전', dest: '박물관', depart: '정문' },
    { time: '13일전', dest: '호텔', depart: '학교' },
    { time: '14일전', dest: '극장', depart: '정문' },
  ];
  const myInfoMenu = [
    {text: '결제 · 정산관리', onPress: ()=>{navigation.navigate('Payment');}},
    {text: '공지 사항', onPress: ()=>{console.log('공지 사항');}},
    {text: '이용 가이드', onPress: ()=>{console.log('이용 가이드');}},
    {text: '이용약관', onPress: ()=>{console.log('이용약관');}},
    {text: 'FAQ/문의하기', onPress: ()=>{console.log('FAQ/문의하기');}},
    {text: '로그아웃', onPress: ()=>{console.log('로그아웃');}},
  ];
  const navigation = useNavigation<nowGaldaeScreenNavigationProp>();
  const [loading, setLoading] = useState<boolean>(false);
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
          <BasicText text="하재연님의 갈대" style={styles.startGaldae}/>

          <View style={styles.userInfoBox}>
            <View style={styles.userInfos}>
              <View style={styles.profile}>
                <Image
                  source={require('../assets/test.jpg')}
                  style={styles.profileImg}
                  resizeMode="cover"
                />
                <SVGButton iconName="camera_2_line" buttonStyle={styles.profileCamera}/>
              </View>
              <View style={styles.userInfoText}>
                <BasicText text="건국대 글로컬캠퍼스" style={styles.universityText}/>
                <View style={styles.profileName}>
                 <BasicText text="하재연" style={styles.nameText}/>
                 <SVGButton iconName="edit_line"/>
                </View>
              </View>
            </View>
            <SVG name="Badge" style={styles.badge}/>
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
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
          >
            {newGaldaeList.map((list, index) => (
              <View key={index} style={styles.newGaldaeList}>
                <BasicText text={list.time} style={styles.newGaldaeTimeText} />
                <BasicText text={`${list.depart}`} style={styles.newGaldaeDepartText} />
                <SVG name="arrow_down_fill_gray2" style={styles.newGaldaeArrowIcon}/>
                <BasicText text={`${list.dest}`} style={styles.newGaldaeDestText} />
              </View>
            ))}
        </ScrollView>

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


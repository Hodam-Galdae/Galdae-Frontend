// NowGaldaeDetail.tsx
import React,{useState} from 'react';
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

// 내비게이션 스택 타입 정의 (이전과 동일)
type RootStackParamList = {
  CreateGaldae: undefined;
  NowGaldae: undefined;
  NowGaldaeDetail: { item: any };
};

type NowGaldaeDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NowGaldaeDetail'>;
type NowGaldaeDetailRouteProp = RouteProp<RootStackParamList, 'NowGaldaeDetail'>;

const NowGaldaeDetail: React.FC = () => {
  const navigation = useNavigation<NowGaldaeDetailScreenNavigationProp>();
  const route = useRoute<NowGaldaeDetailRouteProp>();
  const [loading, setLoading] = useState<boolean>(false);
  const { item } = route.params; // 전달받은 데이터
  const mapUrl = `https://galdae-kakao-map.vercel.app/?startLat=${item.from.lat}&startLng=${item.from.lng}&endLat=${item.destination.lat}&endLng=${item.destination.lng}`;
  console.log(`mapUrl: `,mapUrl);
  const goBack = () => navigation.goBack();
  const handleParticipateGaldae = () =>{
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    },200);
  };
  return (
    <View style={styles.main}>
      <Header
        leftButton={<SVGButton iconName="arrow_left_line" onPress={goBack} />}
        title={
        <View style={styles.headerTitle}>
            <SVG name="location_line"  width={22} height={22}/>
            <BasicText text={item.from.main} style={styles.headerText} />
            <SVG name="arrow_right_line" width={22} height={22}/>
            <BasicText text={item.destination.main} style={styles.headerText} />
        </View>
        }
      />
      <ScrollView style={styles.content}>

        <View style={styles.advertiseBox}>
            <BasicText text="advertiseBox"/>
        </View>

        <View key={item.id} style={styles.borderedListBox}>
          <BasicText text={item.owner} style={styles.galdaeOwner} />
          <View style={styles.fromContainer}>
            <SVG name="Car" />
            <BasicText text={item.from.main} style={styles.fromMainLocation} />
            <BasicText text={item.from.sub} style={styles.fromSubLocation} />
          </View>
          <View style={styles.toContainer}>
            <View style={styles.fromToLine}>
              <SVG name="FromToLine" />
            </View>
            {Array(item.users)
              .fill(null)
              .map((_, idx) => (
                <SVG key={`user-${item.id}-${idx}`} name="User" />
              ))}
            {Array(item.capacity - item.users)
              .fill(null)
              .map((_, idx) => (
                <SVG key={`disabled-${item.id}-${idx}`} name="DisabledUser" />
              ))}
            <BasicText
              text={`(${item.users}/${item.capacity})`}
              fontWeight={500}
              fontSize={theme.fontSize.size16}
              color={theme.colors.gray1}
            />
          </View>
          <View style={styles.toContainer}>
            <SVG name="Location" />
            <BasicText text={item.destination.main} style={styles.fromMainLocation} />
            <BasicText text={item.destination.sub} style={styles.fromSubLocation} />
          </View>
          <View style={styles.timeContainer}>
            <SVG name="Clock" />
            <View>
              <BasicText
                text={item.timeAgreement ? '시간 협의가능' : '시간 협의불가'}
                style={styles.fromMainLocation}
                color={theme.colors.gray2}
                fontSize={theme.fontSize.size10}
              />
              <BasicText
                text={item.time}
                style={styles.fromSubLocation}
                color={theme.colors.black}
                fontSize={theme.fontSize.size14}
              />
            </View>
          </View>
          <View style={styles.tags}>
            {item.tags.map((tag:string, index:number) =>
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

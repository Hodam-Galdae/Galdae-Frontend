// Home.tsx 테스트
import React,{useState} from 'react';
import { ScrollView, View } from 'react-native';
//import stylesheet from '../styles/stylesheet';
import styles from '../styles/Home.style';
import BasicButton from '../components/BasicButton';
import BasicText from '../components/BasicText';
import SVGTextButton from '../components/SVGTextButton';
import { theme } from '../styles/theme';
import BasicInput from '../components/BasicInput';
import SVGButton from '../components/SVGButton';
import FilterButton from '../components/FilterButton';
import GrayBorderTextButton from '../components/GrayBorderTextButton';
import SVG from '../components/SVG';
import TextTag from '../components/TextTag';
import SVGTextTag from '../components/SVGTextTag';

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [generateLoading, setgenerateLoading] = useState<boolean>(false);
  const [destination, setDestination] = useState<string>('');

  const handlePress = () => {
    setLoading(true);
    // 버튼 클릭 시 원하는 로직을 수행하고, 완료 후 로딩 상태를 false로 전환합니다.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleGeneratePress = () => {
    setgenerateLoading(true);
    // 버튼 클릭 시 원하는 로직을 수행하고, 완료 후 로딩 상태를 false로 전환합니다.
    setTimeout(() => {
      setgenerateLoading(false);
    }, 2000);
  };

  const handleMorePress = () => {

  };

  const handleFilterPress = ()=>{

  };

  const handlePressTimeFilterBtn = () =>{

  };

  const handlePressGenderFilterBtn = () =>{

  };

  return (
    <View>
      <BasicButton
        text="어플 공지사항/안내"
        onPress={handlePress}
        loading={loading}
        buttonStyle={styles.notiButton}
        textStyle={styles.notiText}
      />
      <ScrollView style={styles.container}>

        <BasicText text="갈대 시작하기" style={styles.startGaldae}/>
        <BasicText text="목적지 설정 후 동승자를 구하세요!" style={styles.startGaldaeEx}/>

        <View style={styles.borderedBox}>

          <View style={styles.startAndEnd}>

            <View style={styles.startContain}>
              <TextTag
                text="출발지"
                viewStyle={styles.start}
              />
              <BasicText text="학교ㅁㄴㄹㅇ" style={styles.mainPosName}/>
              <BasicText text="중원도서관ㄹㄴㅁㅇㄹ" style={styles.subPosName}/>
            </View>

            <SVGButton
                iconName="Switch"
                buttonStyle={styles.switchBtn}
                SVGStyle={styles.switchIcon}
            />

            <View style={styles.startContain}>
              <TextTag
                text="도착지"
                viewStyle={styles.start}
              />
              <BasicText text="충주 터미널ㄴㅇㄹㅁㅁ" style={styles.mainPosName}/>
              <BasicText text="하이마트앞ㄴㅇㄹ" style={styles.subPosName}/>
            </View>

          </View>

          <View style={styles.line}/>

          <BasicText text="출발일시 : 2025년 11일 12일 (수) 2 : 30" style={styles.startDateTime}/>

        </View>

        <BasicButton
          text="생성하기"
          onPress={handleGeneratePress}
          loading={generateLoading}
          buttonStyle={styles.generateButton}
          textStyle={styles.generateText}
        />

        <View style={styles.advertiseBox}>
            <BasicText text="advertiseBox"/>
        </View>

        <View style={styles.nowGaldaeTitle}>
          <BasicText text="실시간 갈대" style={styles.nowGaldae}/>
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

        <View style={styles.search}>
          <BasicInput
            text="목적지를 검색해주세요."  // placeholder로 사용됨
            style={styles.searchInput}
            value={destination}
            onChangeText={setDestination}
          />
          <SVGButton
                iconName="Search"
                buttonStyle={styles.searchBtn}
                SVGStyle={styles.searchIcon}
            />
        </View>

        <View style={styles.filters}>
          <FilterButton onPress={handleFilterPress} />
          <GrayBorderTextButton
            text="시간협의가능"
            onPress={handlePressTimeFilterBtn}
          />
          <GrayBorderTextButton
            text="성별무관"
            onPress={handlePressGenderFilterBtn}
          />
          {/* <SelectTextButton
            text="성별무관"
            onPress={handlePress}
          />
          <SelectSVGTextButton
            iconName="Bag"
            text="가방"
            onPress={handlePress}
          />
          <TextTag
            text="성별무관"
          />
          <SVGTextTag
            text="캐리어"
            iconName="GreenCarrier"
          /> */}
        </View>


        <View style={styles.nowGaldaeList}>
          <View style={styles.borderedListBox}>

              <BasicText text="하재연님의 갈대" style={styles.galdaeOwner}/>

              <View style={styles.fromContainer}>
                <SVG name="Car"/>
                <BasicText text="정문" style={styles.fromMainLocation}/>
                <BasicText text="학교" style={styles.fromSubLocation}/>
              </View>

              <View style={styles.toContainer}>
                <View style={styles.fromToLine}>
                  <SVG name="FromToLine" />
                </View>
                <SVG name="User"/>
                <SVG name="User"/>
                <SVG name="DisabledUser"/>
                <SVG name="DisabledUser"/>
                <BasicText text="(2/4)" fontWeight={500} fontSize={theme.fontSize.size16} color={theme.colors.gray1}/>
              </View>

              <View style={styles.toContainer}>
                <SVG name="Location"/>
                <BasicText text="던킨도너츠" style={styles.fromMainLocation}/>
                <BasicText text="충주 터미널" style={styles.fromSubLocation}/>
              </View>

              <View style={styles.timeContainer}>
                <SVG name="Clock"/>
                <View>
                  <BasicText text="시간 협의가능" style={styles.fromMainLocation} color={theme.colors.gray2} fontSize={theme.fontSize.size10}/>
                  <BasicText text="2025년 00월 00일 (0) 00 : 00" style={styles.fromSubLocation} color={theme.colors.black} fontSize={theme.fontSize.size14}/>
                </View>
              </View>

              <View style={styles.tags}>
                <TextTag
                  text="성별무관"
                />
                <SVGTextTag
                  text="캐리어"
                  iconName="GreenCarrier"
                />
              </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default Home;


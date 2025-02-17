// Home.tsx 테스트
import React,{useState,useRef} from 'react';
import { ScrollView, View, TouchableOpacity} from 'react-native';
//import stylesheet from '../styles/stylesheet';
import styles from '../styles/Home.style';
import BasicButton from '../components/button/BasicButton';
import BasicText from '../components/BasicText';
import SVGTextButton from '../components/button/SVGTextButton';
import { theme } from '../styles/theme';
import SVGButton from '../components/button/SVGButton';
//import FilterButton from '../components/button/FilterButton';
//import GrayBorderTextButton from '../components/button/GrayBorderTextButton';
import SVG from '../components/SVG';
import TextTag from '../components/tag/TextTag';
import SVGTextTag from '../components/tag/SVGTextTag';
//import Search from '../components/Search';
import FloatingButton from '../components/button/FloatingButton';
import DeletePopup from '../components/popup/DeletePopup';
import FastGaldaeStartPopup, { FastGaldaeStartPopupRef } from '../components/popup/FastGaldaeStartPopup';
import FastGaldaeEndPopup, { FastGaldaeEndPopupRef } from '../components/popup/FastGaldaeEndPopup';
//import SelectSVGTextButton from '../components/button/SelectSVGTextButton';
//import SelectTextButton from '../components/button/SelectTextButton';

type HomeProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
};

const Home: React.FC<HomeProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [generateLoading, setgenerateLoading] = useState<boolean>(false);
  //const [destination, setDestination] = useState<string>('');
  const [deletePopupVisible, setDeletePopupVisible] = useState<boolean>(false);
 // const [fastGaldaePopupVisible, setFastGaldaePopupVisible] = useState<boolean>(false);
  const fastGaldaeStartPopupRef = useRef<FastGaldaeStartPopupRef>(null);
  const fastGaldaeEndPopupRef = useRef<FastGaldaeEndPopupRef>(null);
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

  // const handleFilterPress = ()=>{

  // };

  // const handlePressTimeFilterBtn = () =>{

  // };

  // const handlePressGenderFilterBtn = () =>{

  // };
  const toggleFastGaldaeStartPopup = () =>{
    //setFastGaldaePopupVisible((prev) => !prev);
    fastGaldaeStartPopupRef.current?.open();
  };

  const toggleFastGaldaeEndPopup = () =>{
    //setFastGaldaePopupVisible((prev) => !prev);
    fastGaldaeEndPopupRef.current?.open();
  };
  // DeletePopup 관련 핸들러
  //const openDeletePopup = () => setDeletePopupVisible(true);
  const closeDeletePopup = () => setDeletePopupVisible(false);
  const handleDeleteConfirm = () => {
    // 삭제 로직 실행
    console.log('삭제 confirmed');
    closeDeletePopup();
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
        <BasicText text="갈대 시작하기" style={styles.startGaldae}/>
        <BasicText text="목적지 설정 후 동승자를 구하세요!" style={styles.startGaldaeEx}/>

        <View style={styles.borderedBox}>

          <View style={styles.startAndEnd}>

            <TouchableOpacity style={styles.startContain}  onPress={toggleFastGaldaeStartPopup}>
              <TextTag
                text="출발지"
                viewStyle={styles.start}
              />
              <BasicText text="학교" style={styles.mainPosName}/>
              <BasicText text="중원도서관" style={styles.subPosName}/>
            </TouchableOpacity>

            <SVGButton
                iconName="Switch"
                buttonStyle={styles.switchBtn}
                SVGStyle={styles.switchIcon}
            />

            <TouchableOpacity style={styles.startContain} onPress={toggleFastGaldaeEndPopup}>
              <TextTag
                text="도착지"
                viewStyle={styles.start}
              />
              <BasicText text="충주 터미널" style={styles.mainPosName}/>
              <BasicText text="하이마트앞임" style={styles.subPosName}/>
            </TouchableOpacity>

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

        {/* <Search
        value={destination}
        onChangeText={setDestination}
        placeholder="목적지를 검색해주세요."
        onPressIcon={() => console.log('Search icon pressed')}
        /> */}

        {/* <View style={styles.filters}>
          <FilterButton onPress={handleFilterPress} />
          <GrayBorderTextButton
            text="시간협의가능"
            onPress={handlePressTimeFilterBtn}
          />
          <GrayBorderTextButton
            text="성별무관"
            onPress={handlePressGenderFilterBtn}
          />
          <SelectTextButton
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
          />
        </View> */}


        <View style={styles.nowGaldaeList}>

          <View style={styles.borderedListBox}  >

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
          <View style={styles.borderedListBox}  >

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
            <View style={styles.borderedListBox}  >

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

    </ScrollView>
    <FastGaldaeStartPopup ref={fastGaldaeStartPopupRef} onClose={() => console.log('팝업 닫힘')} />
    <FastGaldaeEndPopup ref={fastGaldaeEndPopupRef} onClose={() => console.log('팝업 닫힘')} />
      <DeletePopup
          visible={deletePopupVisible}
          onCancel={closeDeletePopup}
          onConfirm={() => {
            console.log('삭제 confirmed');
            closeDeletePopup();
            handleDeleteConfirm();
          }}
          title="선택하신 갈대를"
          message="삭제하시겠습니까?"
        />
      <FloatingButton onPress={handlePress} />
    </View>
  );
};

export default Home;


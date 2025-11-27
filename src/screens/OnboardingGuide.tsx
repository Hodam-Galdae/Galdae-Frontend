import React, { useState, useRef } from 'react';
import { View, ScrollView, useWindowDimensions, NativeSyntheticEvent, NativeScrollEvent, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BasicButton from '../components/button/BasicButton';
import BasicText from '../components/BasicText';
import SVG from '../components/SVG';
import styles from '../styles/OnboardingGuide.style';

type RootStackParamList = {
  MainTab: undefined;
  OnboardingGuide: undefined;
};

type OnboardingGuideNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Page1: React.FC = () => {
  const iconSize = Math.round((useWindowDimensions().width / 393) * 60);

  return (
    <View style={styles.page}>
      <View style={styles.titleContainer}>
        <BasicText text="세 가지 카테고리로" style={styles.pageTitle} />
        <Text style={styles.pageTitle}>
          <Text style={styles.pageTitleBold}>대학생 생활비 절약!</Text>
        </Text>
      </View>

      <View style={styles.categoryContainer}>
          <View style={styles.categoryCard}>
            <SVG name="Taxi" width={iconSize} height={iconSize} />
          <View style={styles.speechBubbleWrapper}>
            <View style={styles.triangleLeft} />
            <View style={styles.speechBubble}>
              <BasicText text="자주 가는 경로 같이 타고," style={styles.categoryText} />
              <BasicText text="택시비 N빵 해요!" style={styles.categoryText} />
            </View>
          </View>
        </View>

        <View style={styles.categoryCardReverse}>
          <View style={styles.speechBubbleWrapper}>
            <View style={styles.speechBubble}>
              <BasicText text="최소 주문 금액 맞추고" style={styles.categoryText} />
              <BasicText text="배달비 N빵 해요!" style={styles.categoryText} />
            </View>
            <View style={styles.triangleRight} />
          </View>
          <SVG name="Delivery" width={iconSize} height={iconSize} />
        </View>

        <View style={styles.categoryCard}>
          <SVG name="Ott" width={iconSize} height={iconSize} />
          <View style={styles.speechBubbleWrapper}>
            <View style={styles.triangleLeft} />
            <View style={styles.speechBubble}>
              <BasicText text="OTT 4인 요금제" style={styles.categoryText} />
              <BasicText text="N빵하고 결제해요!" style={styles.categoryText} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const Page2: React.FC = () => (
  <View style={styles.page}>
    <View style={styles.titleContainer}>
      <BasicText text="빵장이 되어 원하는" style={styles.pageTitle} />
      <Text style={styles.pageTitle}>
        <Text style={styles.pageTitleBold}>N빵 그룹을 생성</Text>
        <Text>해 보세요!</Text>
      </Text>
    </View>
    <View style={styles.imageContainer}>
      <Image
        source={require('../assets/onboarding/page2.png')}
        style={styles.onboardingImage}
      />
    </View>
  </View>
);

const Page3: React.FC = () => (
  <View style={styles.page}>
    <View style={styles.titleContainer}>
      <BasicText text="N빵 그룹에 참여하고" style={styles.pageTitle} />
      <Text style={styles.pageTitle}>
        <Text style={styles.pageTitleBold}>그룹원들과 소통</Text>
        <Text>하세요!</Text>
      </Text>
    </View>
    <View style={styles.imageContainer}>
      <Image
        source={require('../assets/onboarding/page3.png')}
        style={styles.onboardingImage}
      />
    </View>
  </View>
);

const Page4: React.FC = () => (
  <View style={styles.page}>
    <View style={styles.titleContainer}>
      <Text style={styles.pageTitle}>
        <Text style={styles.pageTitleBold}>정산을 요청</Text>
        <Text>하고</Text>
      </Text>
      <BasicText text="상세 내용을 확인하세요!" style={styles.pageTitle} />
    </View>
    <View style={styles.imageContainer}>
      <Image
        source={require('../assets/onboarding/page4.png')}
        style={styles.onboardingImage}
      />
    </View>
  </View>
);

const OnboardingGuide: React.FC = () => {
  const navigation = useNavigation<OnboardingGuideNavigationProp>();
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { width: screenWidth } = useWindowDimensions();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(offsetX / screenWidth);
    setCurrentPage(pageIndex);
  };

  const handleSkip = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTab' }],
    });
  };

  const totalPages = 4;

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.paginationContainer}>
          {[...Array(totalPages)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentPage === index && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
      >
        <Page1 />
        <Page2 />
        <Page3 />
        <Page4 />
      </ScrollView>

      <View style={styles.bottomContainer}>
        <BasicButton
          text="건너뛰기"
          onPress={handleSkip}
          buttonStyle={styles.skipButton}
          textStyle={styles.skipButtonText}
        />
      </View>
    </View>
  );
};

export default OnboardingGuide;

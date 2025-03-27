// Onboarding.tsx 임시 테스트
import React, {useRef, useEffect, useState} from 'react';
import {View, Animated, Dimensions} from 'react-native';
import Video from 'react-native-video';
import styles from '../styles/Onboarding.style';
import BasicText from '../components/BasicText';
import {theme} from '../styles/theme';
import SVG from '../components/SVG';
import {Svg, Defs, RadialGradient, Stop, Circle} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import {setUser} from '../modules/redux/slice/UserSlice';
import {getUserInfo} from '../api/membersApi';
import EncryptedStorage from 'react-native-encrypted-storage';

type OnboardingProps = {
  navigation: any; // 실제 프로젝트에서는 proper type 사용 권장 (예: StackNavigationProp)
};

const OnboardingScreen: React.FC<OnboardingProps> = ({navigation}) => {
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const autoLogin = async() => {
      const user = await getUserInfo();
      const accessToken = await EncryptedStorage.getItem('accessToken');

      if(user) {
        dispatch(setUser({...user, token: 'Bearer ' + accessToken}));
        navigation.replace('MainTab');
      }
    };

    autoLogin();
  }, []);

  const pages = [
    <OnBoarding1 />,
    <OnBoarding2 />,
    <OnBoarding3 />,
    <OnBoarding4 />,
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (current < pages.length - 1) {
        setCurrent(current + 1);
      } else {
        navigation.replace('Login');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [current]);

  return pages[current];
};

const OnBoarding1 = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height / 2;
  const position1 = useRef(
    new Animated.ValueXY({x: -153, y: height - 350}),
  ).current;
  const position2 = useRef(
    new Animated.ValueXY({x: width + 185, y: height + 80}),
  ).current;

  useEffect(() => {
    Animated.timing(position1, {
      toValue: {x: -34, y: height - 300},
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(position2, {
      toValue: {x: width - 100, y: height + 35},
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.hand1, position1.getLayout()]}>
        <SVG name="Hand" />
      </Animated.View>
      <Animated.View style={[styles.hand2, position2.getLayout()]}>
        <SVG name="Hand" />
      </Animated.View>
      <BasicText text="새롭게 변경된" style={styles.title} />
      <BasicText
        text="같이 갈 그대, 갈대"
        style={[styles.title, {color: theme.colors.brandColor}]}
      />
      <BasicText text="반갑습니다:)" style={styles.title} />
      <SVG width={72} name="GaldaeLogo" style={styles.logo} />
      <View style={{position: 'absolute', bottom: -350}}>
        <Svg height="542" width="542">
          <Defs>
            <RadialGradient
              id="grad"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%">
              <Stop
                offset="0%"
                stopColor="rgba(218, 255, 205, 0.60)"
                stopOpacity="1"
              />
              <Stop
                offset="100%"
                stopColor="rgba(255, 255, 255, 0.60)"
                stopOpacity="1"
              />
            </RadialGradient>
          </Defs>
          <Circle cx="271" cy="271" r="271" fill="url(#grad)" />
        </Svg>
      </View>
    </View>
  );
};

const OnBoarding2 = () => {
  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.brandColor}]}>
      <SVG name="LogoYellow" />
    </View>
  );
};

const OnBoarding3 = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height / 2;
  const position1 = useRef(new Animated.Value(height - 180)).current;
  const position2 = useRef(new Animated.Value(height - 80)).current;
  const position3 = useRef(new Animated.Value(height + 30)).current;
  const position4 = useRef(new Animated.Value(width + 100)).current;
  const position5 = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(position1, {
        toValue: height - 150,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(position2, {
        toValue: height - 50,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(position3, {
        toValue: height,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(position4, {
        toValue: width / 2 + 40,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(position5, {
        toValue: width / 2 - 150,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[
          styles.hand1,
          {top: height - 150, opacity, transform: [{translateX: position4}]},
        ]}>
        <SVG name="Balloon" />
      </Animated.View>
      <Animated.View
        style={[
          styles.hand1,
          {top: height - 50, opacity, transform: [{translateX: position5}]},
        ]}>
        <SVG name="Balloon" />
      </Animated.View>
      <Animated.View
        style={[
          styles.hand1,
          {
            left: width / 2 - 100,
            opacity,
            transform: [{translateY: position1}],
          },
        ]}>
        <SVG name="LocationGreen" />
      </Animated.View>
      <Animated.View
        style={[
          styles.hand1,
          {left: width / 2 + 70, opacity, transform: [{translateY: position2}]},
        ]}>
        <SVG name="LocationGreen" />
      </Animated.View>
      <Animated.View
        style={[
          styles.hand1,
          {
            left: width / 2 - 138,
            opacity,
            transform: [{translateY: position3}],
          },
        ]}>
        <SVG name="CarAni" />
      </Animated.View>

      <View style={styles.container}>
        <BasicText
          text={'언제 어디서든\n함께 동승자를 구하고 이동해요!'}
          style={[styles.title, {position: 'absolute', zIndex: 999, top: 132}]}
        />
        <Svg height="542" width="542">
          <Defs>
            <RadialGradient
              id="grad"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%">
              <Stop
                offset="0%"
                stopColor="rgba(218, 255, 205, 0.60)"
                stopOpacity="1"
              />
              <Stop
                offset="100%"
                stopColor="rgba(255, 255, 255, 0.60)"
                stopOpacity="1"
              />
            </RadialGradient>
          </Defs>
          <Circle cx="271" cy="271" r="271" fill="url(#grad)" />
        </Svg>
        <SVG width={72} name="GaldaeLogo" style={styles.logo} />
      </View>
    </View>
  );
};

const OnBoarding4 = () => {
  const height = Dimensions.get('window').height / 2;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.wrapper}>
      <Video
        source={require('../assets/video/onboarding.mp4')}
        style={styles.fullScreen}
        paused={false}
        resizeMode={'cover'}
        repeat={false}
      />
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          width: '100%',
          top: height - 250,
        }}>
        <BasicText
          style={{
            fontSize: 28,
            fontWeight: '700',
            color: theme.colors.brandColor,
          }}
          text="환영합니다!"
        />
        <Animated.View style={{opacity}}>
          <BasicText
            style={{
              marginTop: 17,
              fontSize: 20,
              fontWeight: '700',
              color: theme.colors.black,
              textAlign: 'center',
            }}
            text={'편리한 이동을 위한\n당신만의 갈대를 만들어보세요!'}
          />
        </Animated.View>
      </View>
      <SVG
        width={72}
        name="GaldaeLogo"
        style={[styles.logo, {left: '50%', transform: [{translateX: -36}]}]}
      />
    </View>
  );
};

export default OnboardingScreen;

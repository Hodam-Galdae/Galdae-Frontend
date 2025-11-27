import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { theme } from '../styles/theme';
import SVG from './SVG';

const GradientSpinner = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <Svg width="130" height="130" viewBox="0 0 100 100">
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={theme.colors.Galdae} />
              <Stop offset="100%" stopColor={theme.colors.sunPk}/>
            </LinearGradient>
          </Defs>
          <Circle
            cx="50"
            cy="50"
            r="40"
            stroke="url(#grad)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="200"
            strokeDashoffset="100"
          />
        </Svg>
      </Animated.View>
      <SVG name="Progress" width={32} height={32} style={styles.icon}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon : {
    position: 'absolute',
  },
});

export default GradientSpinner;

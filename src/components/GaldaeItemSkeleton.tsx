import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: theme.colors.grayV3,
    borderRadius: theme.borderRadius.size12,
    borderWidth: 1,
    paddingStart: 15,
    paddingEnd: 15,
    paddingBottom: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
  },
  content: {
    flex: 1,
  },
  skeleton: {
    backgroundColor: theme.colors.grayV1,
    borderRadius: 4,
  },
  titleContainer: {
    marginTop: 12,
  },
  departureTimeContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 4,
    alignItems: 'center',
  },
  passengerTimeContainer: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
    alignItems: 'center',
  },
  typeContainer: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  tag: {
    borderRadius: 4,
  },
});

// Move SkeletonBox outside the component to avoid re-creating it on every render
const SkeletonBox = ({
  width,
  height,
  style,
  opacity,
}: {
  width: number | string;
  height: number;
  style?: any;
  opacity: Animated.AnimatedInterpolation<number>;
}) => (
  <Animated.View style={[styles.skeleton, { width, height, opacity }, style]} />
);

const GaldaeItemSkeleton: React.FC = () => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmerAnimation]);

  const opacity = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* 제목 줄 */}
        <View style={styles.titleContainer}>
          <SkeletonBox width="70%" height={16} opacity={opacity} />
        </View>

        {/* 출발 시간 */}
        <View style={styles.departureTimeContainer}>
          <SkeletonBox width={60} height={14} opacity={opacity} />
          <SkeletonBox width={100} height={14} opacity={opacity} />
        </View>

        {/* 승객 수 & 태그들 */}
        <View style={styles.passengerTimeContainer}>
          <SkeletonBox width={50} height={20} opacity={opacity} />
          <SkeletonBox width={80} height={20} style={styles.tag} opacity={opacity} />
          <SkeletonBox width={60} height={20} style={styles.tag} opacity={opacity} />
        </View>
      </View>

      {/* 타입 태그 */}
      <View style={styles.typeContainer}>
        <SkeletonBox width={40} height={20} style={styles.tag} opacity={opacity} />
      </View>
    </View>
  );
};

export default GaldaeItemSkeleton;

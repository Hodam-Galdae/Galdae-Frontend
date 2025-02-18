import { View, Pressable, Text, Animated, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import { theme } from '../styles/theme';

interface Props {
  selectedIndex: number;
  onSelectHandler: (selectedIndex: number) => void;
  menus: string[];
}

const Tabs = ({ selectedIndex, onSelectHandler, menus }: Props) => {
  const width = Dimensions.get('window').width / menus.length;
  const animatedValue = React.useRef(
    new Animated.Value(selectedIndex * width)
  ).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: selectedIndex * width,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, selectedIndex, width]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
            position: 'absolute',
            left: 0,
            width: width,
            borderBottomWidth: 3,
            borderBottomColor: theme.colors.brandColor,
            transform: [{ translateX: animatedValue }],
            bottom: 0,
            zIndex: 999,
        }}
      />
      <View style={styles.slider}/>
      {menus.map((v, i) => (
            <Pressable
            style={{
                flex: 1,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            key={v}
            onPress={() => {
                onSelectHandler(i);
            }}
            >
          <Text
            style={{
              fontSize: theme.fontSize.size18,
              color: selectedIndex === i ? theme.colors.brandColor : theme.colors.gray1,
            }}
          >
            {v}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colors.white,
    },
    slider: {
        width: '100%',
        height: 3,
        backgroundColor: theme.colors.lightGray,
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
});
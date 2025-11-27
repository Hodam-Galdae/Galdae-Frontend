import { View, Pressable, Text, Animated, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import { theme } from '../styles/theme';

interface Props {
  selectedIndex: number;
  onSelectHandler: (selectedIndex: number) => void;
  menus: string[];
}

const Tabs = ({ selectedIndex, onSelectHandler, menus }: Props) => {
  const width = (Dimensions.get('window').width - 30) / menus.length;
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
        style={[styles.animatedIndicator, {
            width: width,
            transform: [{ translateX: animatedValue }],
        }]}
      />
      <View style={styles.slider}/>
      {menus.map((v, i) => (
            <Pressable
            style={styles.tabButton}
            key={v}
            onPress={() => {
                onSelectHandler(i);
            }}
            >
          <Text
            style={[styles.tabText, {
              color: selectedIndex === i ? theme.colors.Galdae : theme.colors.grayV1,
            }]}
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
        marginBottom: 20,
    },
    slider: {
        width: '100%',
        height: 3,
        backgroundColor: theme.colors.grayV3,
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
    animatedIndicator: {
        position: 'absolute',
        left: 0,
        borderBottomWidth: 3,
        borderBottomColor: theme.colors.Galdae,
        bottom: 0,
        zIndex: 999,
    },
    tabButton: {
        flex: 1,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        fontSize: theme.fontSize.size18,
        fontWeight: '700',
        marginBottom: 10,
    },
});

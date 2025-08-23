/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import styles from '../styles/ItemSelector.style';
import BasicText from './BasicText';
import {TouchableOpacity, View, Animated} from 'react-native';
import SVG from './SVG';
import {ScrollView} from 'react-native-gesture-handler';

export interface ItemSelectorProps {
  hint: string;
  items: string[];
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  style?: any;
  textStyle?: any;
}

const ItemSelector: React.FC<ItemSelectorProps> = ({
  textStyle,
  hint,
  items,
  selected,
  setSelected,
  style,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const contentRef = useRef<View>(null);
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const toggle = () => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start(() => setIsOpen(false));
    } else {
      setIsOpen(true);
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 150,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const select = (id: number) => {
    setSelected(id);
    toggle();
  };

  return (
    <View ref={contentRef} style={[styles.container, style]}>
      <TouchableOpacity onPress={toggle}>
        <View style={styles.selectContainer}>
          <BasicText
            text={selected < 0 ? hint : items[selected]}
            style={[styles.text, textStyle]}
          />
          <SVG name={isOpen ? 'UpArrow' : 'DownArrow'} width={16} height={16} />
        </View>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.dropdown,
          {height: animatedHeight, opacity: animatedOpacity},
        ]}>
        <ScrollView>
          {isOpen
            ? items.map((e, i) => {
                return (
                  <TouchableOpacity key={i} onPress={() => select(i)}>
                    <BasicText
                      text={e}
                      style={[
                        styles.text,
                        i === 0 ? {marginTop: 18} : null,
                        {marginBottom: 12},
                        textStyle,
                      ]}
                    />
                  </TouchableOpacity>
                );
              })
            : null}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default ItemSelector;

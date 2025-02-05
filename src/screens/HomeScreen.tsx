import React from 'react';
import { View, Text  } from 'react-native';
import HomeScreenStyle from '../styles/HomeScreen.style';

const HomeScreen = () => {


  return (
    <View style={HomeScreenStyle.container}>
      <Text style={HomeScreenStyle.text}>This is the Home Screen</Text>

    </View>
  );
};



export default HomeScreen;

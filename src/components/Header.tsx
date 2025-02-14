// CustomHeader.tsx
import React from 'react';
import { View } from 'react-native';
import SVG from '../components/SVG';
import { moderateScale } from '../utils/ScreenScaler';
import styles from '../styles/Header.style';
import SVGButton from '../components/button/SVGButton';

const Header: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <SVG name="GaldaeLogo" width={moderateScale(81)} height={moderateScale(32)} />
        </View>
        <View style={styles.notificationContainer}>
            <SVGButton
                iconName="Notification"
                buttonStyle={styles.test}
            />
        </View>
    </View>
  );
};


export default Header;

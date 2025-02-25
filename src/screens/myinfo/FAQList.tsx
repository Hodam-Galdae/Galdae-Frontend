// FAQList.tsx (예: 자주 묻는 질문)
import React, { useState } from 'react';
import { View,ScrollView } from 'react-native';
import styles from '../../styles/FAQ.style';
import SelectTextButton from '../../components/button/SelectTextButton';
import { theme } from '../../styles/theme';
interface menu {
    id: number,
    title:string
}

const FAQList = () => {
    const [selectedMenu, setSelectedMenu] = useState<number>(0);
    const menus : menu[] = [
        {id:0, title:'이용자'},
        {id:1, title:'동승하기'},
        {id:2, title:'결제&정산'},
        {id:3, title:'채팅'},
        {id:4, title:'갈대키우기'},
        {id:5, title:'내 갈대'},
        {id:6, title:'이용약관'},
        {id:7, title:'신고'},
    ];
    return (
      <View>
        <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              contentContainerStyle={styles.menuContainer} // 추가
            >
              {menus.map((menu) => (
                <View key={menu.id} style={styles.menuItem}>
                    <SelectTextButton
                        buttonStyle={styles.btnStyle}
                        textStyle={styles.textStyle}
                        text={menu.title}
                        selected={selectedMenu === menu.id}
                        onPress={() => setSelectedMenu(menu.id)}
                        unselectedColors={{
                          backgroundColor: theme.colors.white,
                          borderColor: theme.colors.brandColor,
                          textColor: theme.colors.brandColor,
                      }}
                    />
                </View>
              ))}
            </ScrollView>


      </View>
    );
};

export default FAQList;

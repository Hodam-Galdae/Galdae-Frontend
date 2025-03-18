import React, { forwardRef, useImperativeHandle, useRef,useState,useContext } from 'react';
import { View,KeyboardAvoidingView } from 'react-native';
import { Modalize } from 'react-native-modalize';
import BasicText from '../BasicText';
import { theme } from '../../styles/theme';
import styles from '../../styles/FastGaldaePopup.style';
import SVGButton from '../button/SVGButton';
import TextTag from '../tag/TextTag';
import { ScrollView } from 'react-native-gesture-handler';
import BasicButton from '../button/BasicButton';
import SelectTextButton from '../button/SelectTextButton';
import BigPictureModal from './BigPictureModal';
import {TabBarVisibilityContext} from '../../utils/TabBarVisibilityContext';
export interface FastGaldaeEndPopupRef {
  open: () => void;
  close: () => void;
}

export interface FastGaldaePopupProps {
  onClose?: () => void;
  onConfirm?: (largeCategory: string, smallCategory: string) => void;
}

const FastGaldaePopup = forwardRef<FastGaldaeEndPopupRef, FastGaldaePopupProps>(
  ({ onClose,onConfirm }, ref) => {
    const modalizeRef = useRef<Modalize>(null);
    const pictureModalRef = useRef<Modalize>(null);
    // 대분류와 소분류 선택 상태 (더미 데이터)
    const [largeCategory, setLargeCategory] = useState<string>('');
    const [smallCategory, setSmallCategory] = useState<string>('');
    const { setIsTabBarVisible } = useContext(TabBarVisibilityContext);
    const handleSelectConfirm = () =>{
      onConfirm && onConfirm(largeCategory, smallCategory);
      modalizeRef.current?.close();
    };

    const toggleLargeCategory = (name: string) =>{
     setLargeCategory(name);

    };
    const handlePicturePress = () => {
      // SVGButton 클릭 시 큰 사진 팝업 열기
      pictureModalRef.current?.open();
    };
    // 외부에서 open/close 함수를 사용할 수 있도록 함
    useImperativeHandle(ref, () => ({
      open: () => {
        modalizeRef.current?.open();
      },
      close: () => {
        modalizeRef.current?.close();
      },
    }));

    return (
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight={true} // ✅ 컨텐츠 크기에 따라 높이 자동 조절
        onOpened={() => {
          setIsTabBarVisible(false);
        }}
        onClosed={() => {
          setIsTabBarVisible(true);
          onClose && onClose();
        }}
        scrollViewProps={{
          keyboardShouldPersistTaps: 'always',
        }}
        overlayStyle={styles.background}
        modalStyle={styles.container}
        withHandle={false}  // 기본 핸들을 비활성화
        {...({ swipeToClose: true, swipeThreshold: 100 } as any)}
      >
         <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
           {/* 팝업 안쪽에 커스텀 핸들 추가 */}
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.content}>
          <BasicText
            text="도착지 설정"
            fontSize={theme.fontSize.size16}
            color={theme.colors.black}
            style={styles.start}
          />

          <View style={styles.landMarkContainer}>

            <View style={styles.picture}>
              <SVGButton
                iconName="ToBigPic"
                onPress={handlePicturePress}
                buttonStyle={styles.toBigPicIcon}
              />
            </View>

            <View style={styles.landMark}>
              <TextTag
                text="랜드마크"
                viewStyle={styles.landMarkTag}
                enabledColors={{
                  backgroundColor: theme.colors.brandSubColor,
                  textColor: theme.colors.brandColor,
                  borderColor:theme.colors.transparent,
                }}
              />
              <BasicText text={smallCategory || '정문'} fontSize={theme.fontSize.size24} style={styles.title}/>
              <BasicText text={largeCategory || '학교'} fontSize={theme.fontSize.size16} color={theme.colors.gray1} style={styles.subTitle}/>
            </View>

          </View>

          <View style={styles.selects}>
            {/** 대분류 */}
            <ScrollView style={styles.selectContainer}>
              <View style={styles.select}>
                <SelectTextButton text={'학교'} onPress={()=>toggleLargeCategory('학교')}
                selected={largeCategory === '학교'}
                unselectedColors={
                  {
                    backgroundColor:theme.colors.transparent,
                    textColor:theme.colors.gray1,
                    borderColor:theme.colors.transparent,
                  }
                }
                selectedColors={
                  {
                    backgroundColor:theme.colors.brandColor,
                    textColor:theme.colors.white,
                    borderColor:theme.colors.transparent,
                  }
                }
                buttonStyle={styles.selectBtn}
                textStyle={styles.selectText}/>
                <SelectTextButton text={'모시래'} onPress={() => toggleLargeCategory('모시래')}
                selected={largeCategory === '모시래'}
                unselectedColors={
                  {
                    backgroundColor:theme.colors.transparent,
                    textColor:theme.colors.gray1,
                    borderColor:theme.colors.transparent,
                  }
                }
                selectedColors={
                  {
                    backgroundColor:theme.colors.brandColor,
                    textColor:theme.colors.white,
                    borderColor:theme.colors.transparent,
                  }
                }
                buttonStyle={styles.selectBtn}
                textStyle={styles.selectText}/>
              </View>

            </ScrollView>
            {/** 소분류 */}
            <ScrollView style={styles.selectContainer}>
                <View style={styles.select}>
                <SelectTextButton text={'정문'}  onPress={() => setSmallCategory('정문')}
                selected={smallCategory === '정문'}
                unselectedColors={
                  {
                    backgroundColor:theme.colors.transparent,
                    textColor:theme.colors.gray1,
                    borderColor:theme.colors.transparent,
                  }
                }
                selectedColors={
                  {
                    backgroundColor:theme.colors.brandColor,
                    textColor:theme.colors.white,
                    borderColor:theme.colors.transparent,
                  }
                }
                buttonStyle={styles.selectBtn}
                textStyle={styles.selectText}/>

              <SelectTextButton text={'후문'}  onPress={() => setSmallCategory('후문')}
                selected={smallCategory === '후문'}
                unselectedColors={
                  {
                    backgroundColor:theme.colors.transparent,
                    textColor:theme.colors.gray1,
                    borderColor:theme.colors.transparent,
                  }
                }
                selectedColors={
                  {
                    backgroundColor:theme.colors.brandColor,
                    textColor:theme.colors.white,
                    borderColor:theme.colors.transparent,
                  }
                }
                buttonStyle={styles.selectBtn}
                textStyle={styles.selectText}/>
                </View>
            </ScrollView>

          </View>

          <View style={styles.confirmBtnContainer}>
            <BasicButton
                 text="완료"
                 disabled={!(largeCategory && smallCategory)}
                 onPress={handleSelectConfirm}
                 buttonStyle={styles.confirmButton}
                 textStyle={styles.confirmText}
                 enabledColors={{
                   backgroundColor: theme.colors.brandColor,
                   textColor: theme.colors.white,
                   borderColor:theme.colors.transparent,
                 }}
                 disabledColors={{
                   backgroundColor: theme.colors.lightGray,
                   textColor: theme.colors.black,
                   borderColor:theme.colors.transparent,
                 }}
               />
            </View>
        </View>
             
          </ScrollView>
        </KeyboardAvoidingView>


        <BigPictureModal
        ref={pictureModalRef}
        imageSource={require('../../assets/test.jpg')}
      />
      </Modalize>
    );
  }
);


export default FastGaldaePopup;

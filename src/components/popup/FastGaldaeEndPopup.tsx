/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, forwardRef, useImperativeHandle, useRef,useState,useContext } from 'react';
import { View,KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';
import BasicText from '../BasicText';
import { Image } from 'react-native';
import { theme } from '../../styles/theme';
import styles from '../../styles/FastGaldaePopup.style';
import SVGButton from '../button/SVGButton';
import TextTag from '../tag/TextTag';
import { ScrollView } from 'react-native-gesture-handler';
import BasicButton from '../button/BasicButton';
import SelectTextButton from '../button/SelectTextButton';
import BigPictureModal from './BigPictureModal';
import {TabBarVisibilityContext} from '../../utils/TabBarVisibilityContext';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../modules/redux/store';
import { RootState } from '../../modules/redux/RootReducer';
import { fetchPlaces } from '../../modules/redux/slice/placesSlice';
export interface FastGaldaeEndPopupRef {
  open: () => void;
  close: () => void;
}

export interface FastGaldaePopupProps {
  onClose?: () => void;
  onConfirm?: (largeCategoryName: string,largeCategoryId:number,  smallCategoryName: string, smallCategoryId:number) => void;
}

const FastGaldaePopup = forwardRef<FastGaldaeEndPopupRef, FastGaldaePopupProps>(
  ({ onClose,onConfirm }, ref) => {
    const modalizeRef = useRef<Modalize>(null);
    const pictureModalRef = useRef<Modalize>(null);
   // 대분류와 소분류 선택 상태 (더미 데이터)
    const [largeCategoryName, setLargeCategoryName] = useState<string>('');
    const [smallCategoryName, setSmallCategoryName] = useState<string>('');
    const [largeCategoryId, setLargeCategoryId] = useState<number>(0);
    const [smallCategoryId, setSmallCategoryId] = useState<number>(0);
    const dispatch = useAppDispatch();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const places = useSelector((state: RootState) => state.placesSlice.places);
    const placesLoading = useSelector((state: RootState) => state.placesSlice.loading);
    const placesError = useSelector((state: RootState) => state.placesSlice.error);


    const { setIsTabBarVisible } = useContext(TabBarVisibilityContext);

     // 컴포넌트 마운트 시 Redux를 통해 places 데이터 불러오기
     useEffect(() => {
      if (!places || places.length === 0) {
        dispatch(fetchPlaces());
      }
    }, [dispatch, places]);
    const handleSelectConfirm = () =>{
      onConfirm && onConfirm(largeCategoryName,largeCategoryId, smallCategoryName, smallCategoryId);
      modalizeRef.current?.close();
    };

    const pressedLargeCategory = (majorPlace:any) =>{
      setLargeCategoryName(majorPlace.majorPlace);
      setLargeCategoryId(majorPlace.majorPlaceId);

     };
     const pressedSubPlace = (subPlace: any) => {
      setSmallCategoryName(subPlace.subPlace);
      setSmallCategoryId(subPlace.subPlaceId);
      setSelectedImage(subPlace.image); // 📌 여기서 image 필드 사용 (백엔드에서 내려주는 key에 따라 조정)
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
          setLargeCategoryName('');
          setLargeCategoryId(0);
          setSmallCategoryName('');
          setSmallCategoryId(0);
          setSelectedImage(null);
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

            <TouchableOpacity style={styles.picture} onPress={handlePicturePress}>
                  {selectedImage &&
                    <Image source={{ uri: selectedImage }} style={{ width: '100%', height: 150, borderRadius: 10 }} resizeMode="cover" />
                  }
                    <SVGButton
                      iconName="ToBigPic"
                      onPress={handlePicturePress}
                      buttonStyle={styles.toBigPicIcon}
                    />
            </TouchableOpacity>

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
              <BasicText text={smallCategoryName || '도착지 선택'} fontSize={theme.fontSize.size24} style={styles.title}/>
              <BasicText text={largeCategoryName || '도착지 선택'} fontSize={theme.fontSize.size16} color={theme.colors.gray1} style={styles.subTitle}/>
            </View>

          </View>

          <View style={styles.selects}>
                {/** 대분류 */}
                <ScrollView style={styles.selectContainer}>
                  <View style={styles.select}>
                    {placesLoading ? (
                      <BasicText text="Loading..." />
                    ) : placesError ? (
                      <BasicText text={`Error: ${placesError}`} />
                    ) : (
                      places.map((majorPlace) => (
                        <SelectTextButton
                          key={majorPlace.majorPlaceId}
                          text={majorPlace.majorPlace}
                          onPress={() => pressedLargeCategory(majorPlace)}
                          selected={largeCategoryName === majorPlace.majorPlace}
                          unselectedColors={{
                            backgroundColor: theme.colors.transparent,
                            textColor: theme.colors.gray1,
                            borderColor: theme.colors.transparent,
                          }}
                          selectedColors={{
                            backgroundColor: theme.colors.brandColor,
                            textColor: theme.colors.white,
                            borderColor: theme.colors.transparent,
                          }}
                          buttonStyle={styles.selectBtn}
                          textStyle={styles.selectText}
                        />
                      ))
                    )}
                  </View>
                </ScrollView>
                {/** 소분류 */}
                <ScrollView style={styles.selectContainer}>
                  <View style={styles.select}>
                    {(() => {
                      const selectedMajor = places.find((p) => p.majorPlace === largeCategoryName);
                      if (selectedMajor && selectedMajor.subPlaceList) {
                        return selectedMajor.subPlaceList.map((subPlace) => (
                          <SelectTextButton
                            key={subPlace.subPlaceId}
                            text={subPlace.subPlace}
                            onPress={() => pressedSubPlace(subPlace)}
                            selected={smallCategoryName === subPlace.subPlace}
                            unselectedColors={{
                              backgroundColor: theme.colors.transparent,
                              textColor: theme.colors.gray1,
                              borderColor: theme.colors.transparent,
                            }}
                            selectedColors={{
                              backgroundColor: theme.colors.brandColor,
                              textColor: theme.colors.white,
                              borderColor: theme.colors.transparent,
                            }}
                            buttonStyle={styles.selectBtn}
                            textStyle={styles.selectText}
                          />
                        ));
                      }
                      return null;
                    })()}
                  </View>
                </ScrollView>
              </View>

          <View style={styles.confirmBtnContainer}>
            <BasicButton
                 text="완료"
                 disabled={!(largeCategoryName && smallCategoryName && largeCategoryId && smallCategoryId)}
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


        {selectedImage && (
          <BigPictureModal
            ref={pictureModalRef}
            imageSource={{ uri: selectedImage }}
          />
        )}
      </Modalize>
    );
  }
);


export default FastGaldaePopup;

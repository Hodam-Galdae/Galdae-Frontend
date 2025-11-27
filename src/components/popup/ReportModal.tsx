/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextInput,
  Image,
} from 'react-native';
import SVG from '../../components/SVG';
import BasicText from '../../components/BasicText';
import styles from '../../styles/ReportModal.style';
import ItemSelector from '../ItemSelector';
import SVGButton from '../button/SVGButton';
import useImagePicker from '../../hooks/useImagePicker';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import {theme} from '../../styles/theme';

export interface ReportPopupProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (reason: string) => void;
  title?: string;
  message?: string;
  containerStyle?: StyleProp<ViewStyle>;
  setImage: React.Dispatch<React.SetStateAction<{uri: string; name: string}>>;
}

const ReportPopup: React.FC<ReportPopupProps> = ({
  visible,
  onCancel,
  onConfirm,
  setImage,
}) => {
  const [selected, setSelected] = useState<number>(-1);
  const [reason, setReason] = useState<string>('');
  const reportText = [
    '상대방이 불건전한 채팅을 보냈어요.',
    '상대방이 정산금을 보내지 않아요.',
    '상대방이 협의된 목적지가 아닌 목적지를 요구해요.',
    '직접 입력',
  ];
  const {imageUri, imageName, getImageByGallery, resetImage} = useImagePicker();

  // 모달이 열릴 때마다 상태 초기화 (이전 데이터 클리어)
  useEffect(() => {
    if (visible) {
      console.log('📂 [신고 모달] 모달 열림 - 상태 초기화');
      setSelected(-1);
      setReason('');
      resetImage();
      setImage({ uri: '', name: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useDidMountEffect(() => {
    const image = {uri: imageUri, name: imageName};
    setImage(image);
    console.log('🖼️ [신고 모달] 이미지 선택됨:', imageUri);
  }, [imageUri]);

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.textPopUp}>
          <TouchableOpacity onPress={onCancel} style={styles.cancelIconWrapper}>
            <SVG name="CancelBlack" style={styles.cancelIcon} />
          </TouchableOpacity>
          <View style={styles.wrapper}>
            <BasicText text="신고하기" style={styles.title} />
            <View style={{position: 'relative', height: 42}}>
              <ItemSelector
                style={{position: 'absolute', zIndex: 999}}
                hint="신고사유를 선택해주세요."
                items={reportText}
                selected={selected}
                setSelected={setSelected}
              />
            </View>
            {selected === reportText.length - 1 ? (
              <>
              <TextInput
                value={reason}
                onChangeText={setReason}
                textAlignVertical="top"
                style={styles.input}
                multiline
                maxLength={100}
                placeholder="신고사유를 입력해주세요."
                placeholderTextColor={theme.colors.blackV3}
              />
              <BasicText text={`(${reason.length}/100)`} style={styles.inputText} />
              </>
            ) : null}
          </View>
          <View style={styles.wrapper}>
            <View style={{flexDirection: 'row', marginBottom: 10, alignItems: 'center'}}>
              <SVGButton
                onPress={getImageByGallery}
                iconName="PictureGray"
                buttonStyle={styles.pictureBtn}
              />
              {imageUri ? (
                <View style={{position: 'relative'}}>
                  <Image
                    source={{uri: imageUri}}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 8,
                      marginRight: 10,
                    }}
                  />
                  <BasicText
                    text="✓"
                    style={{
                      position: 'absolute',
                      top: 2,
                      right: 12,
                      fontSize: 16,
                      color: theme.colors.blue,
                      fontWeight: '700',
                    }}
                  />
                </View>
              ) : (
                <BasicText
                  text="이미지를 선택해주세요"
                  style={{
                    fontSize: theme.fontSize.size12,
                    color: theme.colors.blackV3,
                    marginLeft: 4,
                  }}
                />
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                // 신고 사유 검증
                if (selected === -1) {
                  // 아무것도 선택하지 않음
                  return;
                }
                if (selected === reportText.length - 1 && reason.trim() === '') {
                  // 직접 입력 선택했는데 내용 없음
                  return;
                }

                onConfirm(
                  selected === reportText.length - 1
                    ? reason
                    : reportText[selected],
                );
              }}
              style={styles.btn}>
              <BasicText text="신고하기" style={styles.btnText} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReportPopup;

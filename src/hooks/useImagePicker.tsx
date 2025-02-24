import {useState} from 'react';
import {Platform} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  Permission,
} from 'react-native-permissions';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

const useImagePicker = () => {
  const [imageUri, setImageUri] = useState<string>();

  // 권한 확인 및 요청 함수
  const checkAndRequestPermission = async (permission: Permission) => {
    const result = await check(permission);
    console.log(result);

    if (result === RESULTS.GRANTED) {
      return true;
    } else {
      const requestResult = await request(permission);
      return requestResult === RESULTS.GRANTED;
    }
  };

  // 사진 촬영
  const getImageByCamera = async () => {
    let hasCameraPermission;
    let hasStoragePermission;

    if (Platform.OS === 'android') {
      hasCameraPermission = await checkAndRequestPermission(
        PERMISSIONS.ANDROID.CAMERA,
      );
      hasStoragePermission = await checkAndRequestPermission(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
    } else {
      hasCameraPermission = await checkAndRequestPermission(
        PERMISSIONS.IOS.CAMERA,
      );
      hasStoragePermission = await checkAndRequestPermission(
        PERMISSIONS.IOS.PHOTO_LIBRARY,
      );
    }

    if (hasCameraPermission && hasStoragePermission) {
      launchCamera(
        {
          mediaType: 'photo',
          cameraType: 'back',
          quality: 1,
        },
        (response: ImagePickerResponse) => {
          if (response.didCancel) {
            console.log('User cancelled camera');
          } else if (response.errorCode) {
            console.log('Camera error: ', response.errorMessage);
          } else if (response.assets !== undefined) {
            setImageUri(response.assets[0].uri);
          }
        },
      );
    } else {
      console.log('Permissions are not granted');
    }
  };

  // 갤러리에서 이미지 선택
  const getImageByGallery = async () => {
    let hasStoragePermission;
    if (Platform.OS === 'android') {
      hasStoragePermission = await checkAndRequestPermission(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
    } else {
      hasStoragePermission = await checkAndRequestPermission(
        PERMISSIONS.IOS.PHOTO_LIBRARY,
      );
    }

    if (hasStoragePermission) {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 1,
          selectionLimit: 1,
        },
        response => {
          if (response.didCancel) {
            console.log('User cancelled gallery');
          } else if (response.errorCode) {
            console.log('Gallery error: ', response.errorMessage);
          } else if (response.assets !== undefined) {
            setImageUri(response.assets[0].uri);
          }
        },
      );
    } else {
      console.log('Permissions are not granted');
    }
  };

  return {imageUri, getImageByCamera, getImageByGallery};
};

export default useImagePicker;

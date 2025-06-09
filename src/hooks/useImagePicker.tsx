// useImagePicker.ts
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
  const [imageUri, setImageUri] = useState<string>('');
  const [imageName, setImageName] = useState<string>('');
  const [imageType, setImageType] = useState<string>('');

  // 권한 확인 및 요청 함수
  const checkAndRequestPermission = async (permission: Permission) => {
    const result = await check(permission);
   // console.log(`Check permission: ${permission} => ${result}`);

    if (result === RESULTS.GRANTED) {
      return true;
    } else {
      const requestResult = await request(permission);
     // console.log(`Request permission: ${permission} => ${requestResult}`);
      return requestResult === RESULTS.GRANTED;
    }
  };

  const resetImage = () => {
    setImageName('');
    setImageUri('');
    setImageType('');
  };

  // 사진 촬영
  const getImageByCamera = async () => {
    let hasCameraPermission = false;
    let hasStoragePermission = false;

    if (Platform.OS === 'android') {
      // 카메라 권한
      hasCameraPermission = await checkAndRequestPermission(
        PERMISSIONS.ANDROID.CAMERA,
      );

      // 갤러리(스토리지) 권한
      if (Platform.Version >= 33) {
        // Android 13 이상
        hasStoragePermission = await checkAndRequestPermission(
          PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        );
      } else {
        // Android 12 이하
        hasStoragePermission = await checkAndRequestPermission(
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
      }
      console.log('hasStoragePermission', hasStoragePermission);
    } else {
      // iOS
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
          //  console.log('User cancelled camera');
          } else if (response.errorCode) {
           // console.log('Camera error: ', response.errorMessage);
          } else if (response.assets !== undefined) {
            setImageUri(response.assets[0].uri ?? '');
            setImageName(response.assets[0].fileName ?? '');
            setImageType(response.assets[0].type ?? '');
          }
        },
      );
    } else {
     // console.log('Permissions are not granted');
    }
  };

  // 갤러리에서 이미지 선택
  const getImageByGallery = async () => {
    let hasStoragePermission = false;

    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        // Android 13 이상
        hasStoragePermission = await checkAndRequestPermission(
          PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        );
      } else {
        // Android 12 이하
        hasStoragePermission = await checkAndRequestPermission(
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
      }
    } else {
      // iOS
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
           // console.log('User cancelled gallery');
          } else if (response.errorCode) {
           // console.log('Gallery error: ', response.errorMessage);
          } else if (
            response.assets !== undefined &&
            response.assets.length > 0
          ) {
            setImageUri(response.assets[0].uri ?? '');
            setImageName(response.assets[0].fileName ?? '');
            setImageType(response.assets[0].type ?? '');
          }
        },
      );
    } else {
     // console.log('Permissions are not granted');
    }
  };

  return {imageUri, imageName, imageType, getImageByCamera, getImageByGallery, resetImage};
};

export default useImagePicker;

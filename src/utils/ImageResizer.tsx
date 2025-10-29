import ImageResizer from '@bam.tech/react-native-image-resizer';

export const resizeImage = async (imageUri: string, width: number, height: number, imageName: string, quality: number = 80) => {
    const image = await ImageResizer.createResizedImage(
      imageUri,
      width,
      height,
      'JPEG',
      quality, // 기본값 80% 품질로 압축
      undefined,
      imageName,
      undefined,
      undefined,
    );
    return image;
};

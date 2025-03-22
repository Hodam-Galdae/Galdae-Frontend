import ImageResizer from '@bam.tech/react-native-image-resizer';

export const resizeImage = async (imageUri: string, width: number, height: number, imageName: string) => {
    const image = await ImageResizer.createResizedImage(
      imageUri,
      width,
      height,
      'JPEG',
      100,
      undefined,
      imageName,
      undefined,
      undefined,
    );
    return image;
};

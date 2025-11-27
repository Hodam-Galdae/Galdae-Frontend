declare module 'react-native' {
  interface NativeModulesStatic {
    PackageInfo: {
      packageName: string;
    };
  }
}

export {};

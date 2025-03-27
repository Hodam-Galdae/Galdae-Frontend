/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {TextEncoder} from 'text-encoding';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

global.TextEncoder = TextEncoder;
AppRegistry.registerComponent(appName, () => App);

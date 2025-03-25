// firebase-config.ts
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: '...',
  appId: '...',
};

export const firebaseApp = initializeApp(firebaseConfig);

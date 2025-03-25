// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "expo-react-native-f4668.firebaseapp.com",
  projectId: "expo-react-native-f4668",
  storageBucket: "expo-react-native-f4668.firebasestorage.app",
  messagingSenderId: "102285448571",
  appId: "1:102285448571:web:50dd74ec41bef4e1ecd9de",
  measurementId: "G-XWL0P13GCR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
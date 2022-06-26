import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp, FieldValue } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARQxKFivKIAoftHZPs-Yzn0S_DpEPOkv0",
  authDomain: "notes-40976.firebaseapp.com",
  projectId: "notes-40976",
  storageBucket: "notes-40976.appspot.com",
  messagingSenderId: "615485358503",
  appId: "1:615485358503:web:99448c82ecefa894353682",
  measurementId: "G-8XVKK9G3D5",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const database = getFirestore(firebaseApp);

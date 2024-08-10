import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyAbHfdRy3q2XeuulVSGPhXD2U3JvY1ZYLI",
   authDomain: "react-app-404f2.firebaseapp.com",
   projectId: "react-app-404f2",
   storageBucket: "react-app-404f2.appspot.com",
   messagingSenderId: "280438656394",
   appId: "1:280438656394:web:3265cd5ddbd1d7a4de8c73",
   measurementId: "G-8GS9N6QWDG",
};

// const firebaseConfig = {
//    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//    appId: process.env.REACT_APP_FIREBASE_APP_ID,
//    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

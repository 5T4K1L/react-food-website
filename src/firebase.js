import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDP4mCNQu_NxEhzVN69IGJBksZLuI_30gE",
  authDomain: "react-ecommerce-571f8.firebaseapp.com",
  projectId: "react-ecommerce-571f8",
  storageBucket: "react-ecommerce-571f8.appspot.com",
  messagingSenderId: "983062650707",
  appId: "1:983062650707:web:a875ac5618f368031a4ba6",
  measurementId: "G-DEX3D8BEYF",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAga68ygBXIrkgO-vjkyYlA8amE2wyAOEQ",
  authDomain: "kuyajher-d1582.firebaseapp.com",
  projectId: "kuyajher-d1582",
  storageBucket: "kuyajher-d1582.firebasestorage.app",
  messagingSenderId: "306132206293",
  appId: "1:306132206293:web:adab4bd576d81a381ed85c",
  measurementId: "G-5QZ0W9BQNR",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

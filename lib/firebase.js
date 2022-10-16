
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "ecommerce-63aef.firebaseapp.com",
  projectId: "ecommerce-63aef",
  storageBucket: "ecommerce-63aef.appspot.com",
  messagingSenderId: "562326086353",
  appId: "1:562326086353:web:938cc66e0b38055b1e5bf0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
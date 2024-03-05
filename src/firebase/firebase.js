// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAupNg47zrYYM9ICNdNAO67_AEjMbOOyM",
  authDomain: "rental-bay-test.firebaseapp.com",
  projectId: "rental-bay-test",
  storageBucket: "rental-bay-test.appspot.com",
  messagingSenderId: "79972544181",
  appId: "1:79972544181:web:d210c760c726816f8058fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');

export const firestore = getFirestore(app);
export const storage = getStorage(app);

export default app; // Export the app if needed

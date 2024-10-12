// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNFYk8SSKtAcu-kUTj8LuUoUccKDFayGg",
  authDomain: "warehouses-management.firebaseapp.com",
  projectId: "warehouses-management",
  storageBucket: "warehouses-management.appspot.com",
  messagingSenderId: "176474754148",
  appId: "1:176474754148:web:e4900a5980aad02f76e371"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
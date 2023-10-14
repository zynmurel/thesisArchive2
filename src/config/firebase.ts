// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKqke3R3hZhK_-d2w7hR7ertfJN2k8t3o",
  authDomain: "thesis-management-402003.firebaseapp.com",
  projectId: "thesis-management-402003",
  storageBucket: "thesis-management-402003.appspot.com",
  messagingSenderId: "677296106506",
  appId: "1:677296106506:web:5da8590cfd55d2740b43f3",
  measurementId: "G-LJMYVS5XVL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

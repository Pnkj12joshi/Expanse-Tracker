// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm60_rSz55IGQB6C9sFO36h8bJ8G786OI",
  authDomain: "financetracker0002.firebaseapp.com",
  projectId: "financetracker0002",
  storageBucket: "financetracker0002.appspot.com",
  messagingSenderId: "469702470066",
  appId: "1:469702470066:web:fbc9e489c06b547c2d1cab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Initialize Firebase Authentication
const auth = getAuth(app);
// Initialize Firebase Storage
const storage = getStorage(app);

export {db,auth,storage,createUserWithEmailAndPassword, signInWithEmailAndPassword};

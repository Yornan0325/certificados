// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBUTeFG5RyxdPj1MyJenH5S_7-F9DuboxQ",
  authDomain: "johanfit-2dc55.firebaseapp.com",
  projectId: "johanfit-2dc55",
  storageBucket: "johanfit-2dc55.appspot.com",
  messagingSenderId: "732940225517",
  appId: "1:732940225517:web:c9c5f103f8870faa2af5e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = initializeFirestore(app, {})
const dbs = getFirestore (app)
export { app, auth, db,dbs }
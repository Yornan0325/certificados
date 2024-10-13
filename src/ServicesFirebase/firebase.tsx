// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDKafAUzn9ey8_Jx04m_diDLELNXIA6LLU",
  authDomain: "certificados-4b48a.firebaseapp.com",
  projectId: "certificados-4b48a",
  storageBucket: "certificados-4b48a.appspot.com",
  messagingSenderId: "422109828275",
  appId: "1:422109828275:web:adfd25f54a284b724a8cc6",
  measurementId: "G-WKKRH69MV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = initializeFirestore(app, {})
const dbs = getFirestore (app)
export { app, auth, db,dbs }





 
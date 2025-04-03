// Importa las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDKafAUzn9ey8_Jx04m_diDLELNXIA6LLU",
  authDomain: "certificados-4b48a.firebaseapp.com",
  projectId: "certificados-4b48a",
  storageBucket: "certificados-4b48a.appspot.com",
  messagingSenderId: "422109828275",
  appId: "1:422109828275:web:adfd25f54a284b724a8cc6",
  measurementId: "G-WKKRH69MV5"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Exportar instancias necesarias
export { app, auth, db, storage, addDoc, collection };

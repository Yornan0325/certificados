import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../ServicesFirebase/firebase";
import {  doc, setDoc } from "firebase/firestore"; // Para guardar en Firestore
import { FirebaseError } from "firebase/app";

 
export const useHandleAuthSignUp = () => {
  // Creación de nuevos usuarios en Firebase
  const handleSignUp = async (email: string, password: string, name:string, setIsLoading: (loading: boolean) => void, setError: (error: string) => void) => {
    setIsLoading(true);
    setError("");

    try {
        createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // const user = userCredential.user;
      // Crea un nuevo usuario con correo y contraseña en Firebase
      await setDoc(doc(db, "usuarios", email), {
        email: email,
        role:"invitado",
        name: name,  
        createdAt: new Date(),  
      });

      setIsLoading(false);
      alert("Usuario registrado con éxito y datos guardados en Firestore!");
    } catch (error) {
      setIsLoading(false);

      // Verifica si el error es de tipo FirebaseError
      if (error instanceof FirebaseError) {
        setError(error.message); // Muestra el mensaje de error de Firebase
      } else {
        setError("Ocurrió un error inesperado con la base de datos"); // Mensaje genérico para otros tipos de error
      }
    }
  };

  return { handleSignUp };
};
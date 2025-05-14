import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../ServicesFirebase/firebase";
import { doc, setDoc } from "firebase/firestore"; 
import { FirebaseError } from "firebase/app";

export const useHandleAuthSignUp = () => {
  // Creación de nuevos usuarios en Firebase
  const handleSignUp = async (
    email: string,
    password: string,
    username: string,
    setIsLoading: (loading: boolean) => void,
    setError: (error: string) => void
  ) => {
    setIsLoading(true);
    setError("");
    const userRole = "invitado";
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Crea un nuevo documento en Firestore usando el email como ID
      await setDoc(doc(db, "usuarios", email), {
        createdAt: new Date(),
        email: email,
        role: userRole,
        name: username,
        uid: userCredential.user.uid, // Guarda el UID del usuario
        check:false
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
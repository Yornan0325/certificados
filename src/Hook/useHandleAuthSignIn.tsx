import { signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { auth } from "../ServicesFirebase/firebase";
import { FirebaseError } from "firebase/app";

 
export const useHandleAuthSignIn = () => {
  // Maneja el inicio de sesión de usuarios en Firebase
  const handleSignIn = async (
    email: string,
    password: string,
    setIsLoading: (loading: boolean) => void,
    setError: (error: string) => void
  ) => {
    setIsLoading(true);
    setError("");

    try {
      // Iniciar sesión con Firebase
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
    } catch (error: unknown) {
      setIsLoading(false);
      
      // Verifica si el error es de tipo FirebaseError
      if (error instanceof FirebaseError) {
        if (
          error.code === AuthErrorCodes.INVALID_PASSWORD ||
          error.code === AuthErrorCodes.USER_DELETED
        ) {
          setError("La dirección de correo electrónico o la contraseña son incorrectas");
        } else {
          setError("Ocurrió un error inesperado al iniciar sesión");
        }
      } else {
        setError("Ocurrió un error inesperado");
      }
    }
  };

  

  return { handleSignIn };
};
  
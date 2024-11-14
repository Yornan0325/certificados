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
    } catch (error: unknown) {
      setIsLoading(false);

      // Verifica si el error es de tipo FirebaseError
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case AuthErrorCodes.INVALID_PASSWORD:
          case AuthErrorCodes.USER_DELETED:
            setError("La dirección de correo electrónico o la contraseña son incorrectas");
            break;
          case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
            setError("Has intentado demasiadas veces. Inténtalo más tarde.");
            break;
          default:
            setError("Ocurrió un error inesperado al iniciar sesión");
            console.error("FirebaseError:", error); // Log para otros errores de Firebase
        }
      } else {
        setError("Ocurrió un error inesperado");
        console.error("Unknown error:", error); // Log para errores no manejados
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSignIn };
};
  
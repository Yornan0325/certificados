import {signOut} from "firebase/auth";
import { auth } from "../ServicesFirebase/firebase";
 

 
export const useHandleAuthSigOut= () => {
  // Cerrar el inicio de sesión 
  const signOutSesion = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return { signOutSesion };
};
  
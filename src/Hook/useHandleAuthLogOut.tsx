import {signOut} from "firebase/auth";
import { auth } from "../ServicesFirebase/firebase";
 

 
export const useHandleAuthLogin = () => {
  // Cerrar el inicio de sesión 
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return { logOut };
};
  
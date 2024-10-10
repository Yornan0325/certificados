import {
    signInWithEmailAndPassword,
    AuthErrorCodes,
    signOut,
  } from "firebase/auth";
  import { useState } from "react";
  import { auth } from "./firebase";
  
  interface UserType {
    [key: string]: string;
  }
  
  const useHandleAuthLogin = () => {
    const [isLoading, setLoading] = useState(false);
    const [loginError, setError] = useState<null | string>(null);
    const [input, setInput] = useState<UserType>({});
  
    // handle form submit
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    };
  
    // sign in user
    const signIn = async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error: unknown) {
        if (
          error === AuthErrorCodes.INVALID_PASSWORD ||
          error === AuthErrorCodes.USER_DELETED
        ) {
          setError(
            "La dirección de correo electrónico o la contraseña son incorrectas"
          );
        }
      } finally {
        setLoading(false);
      }
    };
  
    const logOut = async () => await signOut(auth);
  
    return { isLoading, loginError, signIn, handleChange, input, logOut };
  };
  
  export { useHandleAuthLogin };
  
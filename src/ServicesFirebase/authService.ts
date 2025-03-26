import { auth } from "./firebase";
import { sendPasswordResetEmail } from "firebase/auth";

// Función para enviar correo de recuperación de contraseña
export const recoverPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return "Correo de recuperación enviado.";
  } catch (error) {
    return "Error al enviar el correo.";
  }
};

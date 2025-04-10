import { getFirestore, doc, updateDoc, getDocs, collection, query, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

/**
 * Obtiene los usuarios pendientes de activación.
 * @returns Lista de usuarios que aún no han sido activados.
 */
export const getPendingUsers = async () => {
  try {
    const usersQuery = query(collection(db, "usuarios"), where("activo", "==", false));
    const querySnapshot = await getDocs(usersQuery);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as any[];
  } catch (error) {
    console.error("Error al obtener usuarios pendientes:", error);
    return [];
  }
};

/**
 * Activa un usuario en Firestore cambiando el campo "activo" a true.
 * @param userId - ID del usuario en Firestore.
 */
export const activateUser = async (userId: string) => {
  try {
    const userRef = doc(db, "usuarios", userId);
    await updateDoc(userRef, { activo: true });
    console.log(`Usuario ${userId} activado correctamente.`);
  } catch (error) {
    console.error("Error al activar usuario:", error);
    throw new Error("No se pudo activar el usuario.");
  }
};

/**
 * Inicia sesión con validación de cuenta activa.
 * @param email - Email del usuario.
 * @param password - Contraseña del usuario.
 * @returns Usuario autenticado si la cuenta está activa.
 */
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Verificar si el usuario está activo en Firestore
    const userSnapshot = await getDocs(query(collection(db, "usuarios"), where("email", "==", email)));

    if (userSnapshot.empty) {
      throw new Error("El usuario no está registrado.");
    }

    const userData = userSnapshot.docs[0].data();

    if (!userData?.activo) {
      throw new Error("Tu cuenta aún no ha sido activada por el administrador.");
    }

    return user;
  } catch (error) {
    console.error("Error en inicio de sesión:", error);
    throw error;
  }
};

/**
 * Envía un correo de recuperación de contraseña.
 * @param email - Email del usuario.
 * @returns Mensaje de confirmación.
 */
export const recoverPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return "Correo de recuperación enviado.";
  } catch (error) {
    console.error("Error al enviar el correo de recuperación:", error);
    throw new Error("Error al enviar el correo. Verifica el email ingresado.");
  }
};

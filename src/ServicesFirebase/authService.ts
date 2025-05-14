import { getFirestore, doc, updateDoc, getDocs, collection, query, where, deleteDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

/**
 * Obtiene los usuarios pendientes de activación.
 * @returns Lista de usuarios que aún no han sido activados.
 */
export const getPendingUsers = async () => {
  try {
    const usersQuery = query(collection(db, "usuarios"), where("check", "==", false));
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
    await updateDoc(userRef, { check: true });
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

    if (!userData?.check) {
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

/**
 * Activa un usuario y le asigna un rol y consorcio.
 * @param userId - ID del usuario en Firestore.
 * @param rol - Rol asignado (SISO o Auxiliar).
 * @param consorcio - Nombre del consorcio.
 */
export const activateUserWithRoleAndConsorcio = async (userId: string, rol: string, consorcio: string) => {
  try {
    const userRef = doc(db, "usuarios", userId);
    await updateDoc(userRef, {
      check: true,
      rol,
      consorcio,
    });
    console.log(`Usuario ${userId} activado con rol ${rol} y consorcio ${consorcio}.`);
  } catch (error) {
    console.error("Error al activar usuario con rol:", error);
    throw new Error("No se pudo activar el usuario.");
  }
};

/**
 * Elimina un usuario de Firestore (rechazo).
 * @param userId - ID del usuario.
 */
export const rejectUser = async (userId: string) => {
  try {
    await deleteDoc(doc(db, "usuarios", userId));
    console.log(`Usuario ${userId} eliminado correctamente.`);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw new Error("No se pudo eliminar el usuario.");
  }
};

/**
 * Obtiene la lista de consorcios disponibles desde la colección "proyectos".
 * @returns Arreglo de nombres de consorcios.
 */
export const getConsorcios = async (): Promise<string[]> => {
  try {
    const snapshot = await getDocs(collection(db, "proyectos"));
    return snapshot.docs.map((doc) => doc.data().nombre as string);
  } catch (error) {
    console.error("Error al obtener consorcios:", error);
    return [];
  }
};

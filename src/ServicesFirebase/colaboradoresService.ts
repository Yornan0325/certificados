import { db } from "./firebase"; // Asegúrate de que la ruta es correcta
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Función para obtener todos los colaboradores
export const obtenerColaboradores = async () => {
  try {
    const colaboradoresRef = collection(db, "colaboradores");
    const snapshot = await getDocs(colaboradoresRef);

    const colaboradores = snapshot.docs.map((doc) => ({
      id: doc.id, // ID generado por Firestore
      ...doc.data(), // Datos del colaborador
    }));

    return colaboradores;
  } catch (error) {
    console.error("Error al obtener colaboradores:", error);
    throw error;
  }
};

// Función para verificar si el colaborador ya existe en la base de datos
const verificarDuplicados = async (idNumber: string, fullName: string): Promise<boolean> => {
  try {
    const colaboradoresRef = collection(db, "colaboradores");

    // Buscar si ya existe un colaborador con el mismo ID o Nombre
    const q = query(colaboradoresRef, where("idNumber", "==", idNumber));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) return true; // Si hay coincidencias, retorna `true`

    const qName = query(colaboradoresRef, where("fullName", "==", fullName.toLowerCase()));
    const snapshotName = await getDocs(qName);

    return !snapshotName.empty; // Si hay coincidencias, retorna `true`
  } catch (error) {
    console.error("Error al verificar duplicados:", error);
    return false; // En caso de error, asumir que no hay duplicados para evitar bloqueos
  }
};

// Función para agregar un colaborador con validación de duplicados
export const agregarColaborador = async (colaborador: {
  idNumber: string;
  fullName: string;
  contractType: string;
  startDate: string;
  position: string;
  salary: string;
}) => {
  try {
    // Convertir nombre a minúsculas para evitar duplicados con mayúsculas/minúsculas
    const colaboradorNormalizado = {
      ...colaborador,
      fullName: colaborador.fullName.trim().toLowerCase(),
    };

    // Verificar si el colaborador ya existe
    const existe = await verificarDuplicados(colaboradorNormalizado.idNumber, colaboradorNormalizado.fullName);

    if (existe) {
      console.error("Error: El ID o el Nombre ya están registrados.");
      throw new Error("El ID o el Nombre ya están en uso.");
    }

    // Agregar colaborador si no hay duplicados
    const docRef = await addDoc(collection(db, "colaboradores"), colaboradorNormalizado);
    console.log("Colaborador agregado con ID: ", docRef.id);
  } catch (error) {
    console.error("Error al agregar colaborador: ", error);
    throw error;
  }
};

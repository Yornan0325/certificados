import { db } from "../ServicesFirebase/firebase";
import { collection, addDoc, getDocs, query, where, DocumentData } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"; 

const storage = getStorage(); 

// Obtener colaboradores por proyecto (consorcio)
export const obtenerColaboradoresPorProyecto = async (proyectoId: string) => {
  if (!proyectoId) throw new Error("ID de proyecto no proporcionado");

  try {
    const ref = collection(db, "proyectos", proyectoId, "Colaboradores"); 
    const snapshot = await getDocs(ref);

    const colaboradores = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return colaboradores;
  } catch (error) {
    console.error("Error al obtener colaboradores por proyecto:", error);
    throw error;
  }
};

// Verificar duplicado en un proyecto por número de cédula
export const verificarDuplicadoEnProyecto = async (
  proyectoId: string,
  idNumber: string
): Promise<boolean> => {
  try {
    const ref = collection(db, "proyectos", proyectoId, "Colaboradores"); 
    const q = query(ref, where("idNumber", "==", idNumber));
    const snapshot = await getDocs(q);

    return !snapshot.empty;
  } catch (error) {
    console.error("Error al verificar duplicado:", error);
    return false;
  }
};

// Agregar colaborador a un proyecto específico
export const agregarColaboradorAProyecto = async (
  proyectoId: string,
  colaborador: {
    contractType: string;
    fullName: string;
    idNumber: string;
    startDate: string;
    endDate?: string;
    position: string;
    salary: string;
    isRetired: boolean;
  }
) => {
  try {
    // Verificar duplicado antes de guardar
    const duplicado = await verificarDuplicadoEnProyecto(
      proyectoId,
      colaborador.idNumber
    );

    if (duplicado) {
      throw new Error("Ya existe un colaborador con esa cédula en el consorcio.");
    }

    // Guardar en la subcolección correcta
    const ref = collection(db, "proyectos", proyectoId, "Colaboradores");
    await addDoc(ref, colaborador);
  } catch (error) {
    console.error("Error al agregar colaborador:", error);
    throw error;
  }
};

// Subir PDF a Firebase Storage
export const uploadPDF = async (file: File, userId: string, docType: string) => {
  const storageRef = ref(storage, `documentos/${userId}/${docType}.pdf`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};
 
// Obtener URL de descarga de un PDF desde Firebase Storage
export const getPDFUrl = async (userId: string, docType: string): Promise<string> => {
  const storage = getStorage();
  const fileRef = ref(storage, `documentos/${userId}/${docType}.pdf`);
  return await getDownloadURL(fileRef);
};

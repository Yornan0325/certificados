import { useState } from "react";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../ServicesFirebase/firebase";
import { ProjectType } from "../TypeScript/Types/types"; 

const useManageProjects = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createProject = async (project: ProjectType) => {
    setLoading(true);
    setError(null);
    try {
      // Referencia a la colección 'proyectos'
      const projectsCollectionRef = collection(db, "proyectos");

      // Agregar el documento y obtener la referencia
      const docRef = await addDoc(projectsCollectionRef, project);

      // Usar el ID generado automáticamente y actualizar el documento con él
      await updateDoc(docRef, { uid: docRef.id });

      console.log("Proyecto creado con éxito con uid:", docRef.id);
    } catch (err) {
      console.error("Error al crear el proyecto:", err);
      setError("Error al crear el proyecto");
    } finally {
      setLoading(false);
    }
  };


  const updateProject = async (projectId: string, updatedData: Partial<ProjectType>) => {
    setLoading(true);
    setError(null);
    try {
      const projectDocRef = doc(db, "proyectos", projectId);
      await updateDoc(projectDocRef, updatedData);
      console.log("Proyecto actualizado con éxito");
    } catch (err) {
      console.error("Error al actualizar el proyecto:", err);
      const errorMessage = (err as { message?: string }).message || "Error desconocido";
      setError(`Error al actualizar el proyecto: ${errorMessage}`); 
    } finally {
      setLoading(false);
    }
  };

  return { createProject, updateProject, loading, error };
};

export default useManageProjects; 
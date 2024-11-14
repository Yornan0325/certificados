import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../ServicesFirebase/firebase";
import { ProjectType } from "../TypeScript/Types/types"; // Asegúrate de que la ruta sea correcta
import { useUserStore } from "../Context/context"; // Contexto para manejar el estado global de los proyectos

// Hook personalizado para obtener los datos de proyectos desde Firestore
export const useGetProjectsFromFirestore = () => {
  // Función del contexto para actualizar proyectos
  const setProjects = useUserStore((state) => state.setProjects);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoadingProjects(true);
      try {
        // Referencia a la colección 'proyectos' en Firestore
        const projectsCollectionRef = collection(db, "proyectos");
        const snapshot = await getDocs(projectsCollectionRef);

        // Mapear los documentos a un arreglo de objetos `ProjectType`
        const projectsData: ProjectType[] = snapshot.docs.map((doc) => ({
          projectTitle: doc.data().projectTitle || "",
          uid: doc.data().uid || "",
        }));

        // Actualizar el estado global con los datos obtenidos
        setProjects(projectsData);
      } catch (error) {
        console.error("Error al obtener los datos de los proyectos:", error);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects(); // Llamar a la función para obtener los datos
  }, [setProjects]);

  return { loadingProjects }; // Devuelve el estado de carga para mostrar un spinner o similar en el componente
};

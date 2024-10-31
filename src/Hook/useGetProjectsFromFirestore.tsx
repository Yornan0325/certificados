import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../ServicesFirebase/firebase";
import {  ProjectType } from "../TypeScript/Types/types"; // Asegúrate de que la ruta sea correcta
import { useUserStore } from "../Context/context"; // Contexto para manejar el estado global de los proyectos

// Hook personalizado para obtener los datos de proyectos desde Firestore
export const useGetProjectsFromFirestore = () => {
  const setProjects = useUserStore((state) => state.setProjects); // Función del contexto para actualizar proyectos
  
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // Referencia a la colección 'cards' en Firestore
        const cardsCollectionRef = collection(db, "cards");
        const cardsSnapshot = await getDocs(cardsCollectionRef);

        // Mapear los documentos a un arreglo de objetos `CardData`
        const projectsData: ProjectType[] = cardsSnapshot.docs.map((doc) => ({
          icon: doc.data().icon || "",
          title: doc.data().title || "",
          number: doc.data().number || 0,
        }));

        // Actualizar el estado global con los datos obtenidos
        setProjects(projectsData);
      } catch (error) {
        console.error("Error al obtener los datos de los proyectos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects(); // Llamar a la función para obtener los datos

  }, [setProjects]);

  return { loading }; // Devuelve el estado de carga para mostrar un spinner o similar en el componente
};
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../ServicesFirebase/firebase";
import { UserType } from "../TypeScript/Types/types"; // Asegúrate de que la ruta sea correcta
import { useUserStore } from "../Context/context"; // Importa tu contexto correctamente
import { onAuthStateChanged } from "firebase/auth";

// Hook personalizado para obtener los datos del usuario autenticado desde Firestore
export const useGetDataFromFirestore = () => {
  const setDataUser = useUserStore((state) => state.setDataUser); // Trae la función del contexto
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userEmail = user.email;
        setLoading(true);
        try {
          const userDocRef = doc(db, "usuarios", userEmail!);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const formattedUserData: UserType = {
              createdAt: userData.createdAt || "",
              email: userData.email || "",
              name: userData.name || "",
              role: userData.role || "",
              uid: user.uid,
            };

            // Usamos setDataUser del contexto para actualizar el estado global
            setDataUser([formattedUserData]);
          } else {
            console.log("No se encontraron datos para el usuario.");
          }
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No hay un usuario autenticado.");
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Limpia el listener cuando se desmonte el componente
  }, [setDataUser]);

  return { loading }; // Devuelve el estado de carga para mostrar un spinner o similar en el componente
};

// import { useEffect } from 'react';
// import { useUserStore } from '../Context/context';
// import { UserType } from '../TypeScript/Types/types';
// import { db, auth } from "../ServicesFirebase/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import response from '../Hooks/data.json'; // JSON simulado

// const useDataUsers = () => {
//   const setDataUser = useUserStore((state) => state.setDataUser);
//   const setLoading = useUserStore((state) => state.setLoading);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       const user = auth.currentUser;

//       try {
//         // Si hay un usuario autenticado, intentamos obtener sus datos de Firestore
//         if (user) {
//           const userEmail = user.email;
//           const userDocRef = doc(db, "usuarios", userEmail!);
//           const userDoc = await getDoc(userDocRef);

//           if (userDoc.exists()) {
//             // Transformar los datos para que coincidan con la estructura de UserType
//             const userData = userDoc.data();
//             const formattedUserData: UserType = {
//               createdAt: userData.createdAt || "",
//               email: userData.email || "",
//               name: userData.name || "",
//               role: userData.role || "invitado",
//               uid: user.uid,
//             };

//             setDataUser([formattedUserData]);
//             console.log("Datos del usuario desde Firestore:", formattedUserData);
//           } else {
//             console.log("No se encontraron datos del usuario en Firestore.");
//           }
//         } else {
//           // Si no hay usuario autenticado, cargar los datos simulados desde el archivo JSON
//           console.log("No hay un usuario autenticado. Cargando datos desde JSON.");
//           const data: UserType[] = response;
//           setDataUser(data);
//         }

//         // Simular un pequeño retraso para el indicador de carga
//         await new Promise(resolve => setTimeout(resolve, 1000));
//       } catch (error) {
//         console.error('Error al cargar los datos de usuarios:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [setDataUser, setLoading]);

//   return null;
// };

// export default useDataUsers;
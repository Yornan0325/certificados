import { useEffect } from "react";
import { useUserStore } from "../Context/context";
import { UpdateUserAuth } from "../TypeScript/Types/types";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../ServicesFirebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const useSuscribeToAuthState = (updateUserAuth: UpdateUserAuth) => {
  // Handle user state changes

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        updateUserAuth(user);
      } else {
        updateUserAuth(null);
      }
    });

    return unsubscribe;
  }, [updateUserAuth]);
};

const useHandleUser = () => {
  const { updateUserAuth, updateUserRole, userAuth } = useUserStore();
  // Suscribirse al estado de autenticación: Autenticación
  useSuscribeToAuthState(updateUserAuth);
  // Suscríbete al estado de usuario: Firestore
  useEffect(() => {
    if (!userAuth?.email) return;

    const unsubscribe = onSnapshot(
      doc(db, "usuarios", userAuth.email as string),
      (doc) => {
        if (doc.exists()) {
          updateUserRole(doc.data().role);
        }
      }
    );
    return unsubscribe;
  }, [updateUserRole, userAuth]);
};

export { useHandleUser };

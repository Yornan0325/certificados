import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../ServicesFirebase/firebase";
import { useUserStore } from "../Context/context";

const useCollaborators = () => {
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const { dataUser } = useUserStore();

  useEffect(() => {
    const fetchCollaborators = async () => {
      const userConsorcio = dataUser[0]?.consorcio;
      if (!userConsorcio) return;

      const q = query(collection(db, "proyectos"), where("projectTitle", "==", userConsorcio));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return;

      const projectDoc = snapshot.docs[0];
      const ref = collection(db, "proyectos", projectDoc.id, "Colaboradores");
      const colabSnapshot = await getDocs(ref);
      const data = colabSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCollaborators(data);
    };

    fetchCollaborators();
  }, [dataUser]);

  return collaborators;
};

export default useCollaborators;
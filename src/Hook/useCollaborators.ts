import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../ServicesFirebase/firebase";

const useCollaborators = (projectId: string) => {
  const [collaborators, setCollaborators] = useState<any[]>([]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      const ref = collection(db, "proyectos", projectId, "Colaboradores");
      const snapshot = await getDocs(ref);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCollaborators(data);
    };

    if (projectId) fetchCollaborators();
  }, [projectId]);

  return collaborators;
};

export default useCollaborators;

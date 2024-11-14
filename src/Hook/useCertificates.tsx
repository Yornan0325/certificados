import { useEffect, useState } from "react";
import { db } from "../ServicesFirebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { CertificateType } from "../TypeScript/Types/types";

const useCertificates = () => {
  const [certificatesByProject, setCertificatesByProject] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const certificatesCollection = collection(db, "certificados");
        const querySnapshot = await getDocs(certificatesCollection);

        const projectPendingCounts: { [key: string]: number } = {};

        querySnapshot.forEach((doc) => {
          const certificate = doc.data() as CertificateType;
          const { projectUid, state } = certificate;           
          if (state === "Pendiente" && projectUid) {  
            if (!projectPendingCounts[projectUid]) {
              projectPendingCounts[projectUid] = 0;
            }
            projectPendingCounts[projectUid]++;
          }
        });

        setCertificatesByProject(projectPendingCounts);

      } catch (error) {
        console.error("Error al obtener los certificados:", error);
      }
    };

    fetchCertificates();
  }, []);

  return { certificatesByProject };
};

export default useCertificates;
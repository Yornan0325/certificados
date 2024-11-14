import React from "react";
import CardItem from "./ProjectList";
import { useUserStore } from "../../Context/context";
import useCertificates from "../../Hook/useCertificates";
import { FaUser } from "react-icons/fa";

export interface CardData {
  icon: JSX.Element;
  title: string;
  number: number;
  onClick: () => void;
  uid: string;
}
import { useGetProjectsFromFirestore } from "../../Hook/useGetProjectsFromFirestore";
import HollowDotsSpinner from "../Spinner/HollowDotsSpinner";

const ProjectsCards: React.FC = () => {
  const { dataUser, projects } = useUserStore();
  const { loadingProjects } = useGetProjectsFromFirestore();
  const role = dataUser[0]?.role || "defaultRole";

  const { certificatesByProject } = useCertificates();

 

  if (loadingProjects) {
    return <HollowDotsSpinner/>; 
  }

  if (!projects || projects.length === 0) {
    return <div>No hay proyecto</div>;  
  }
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-2">
      {projects.map((project) => {
        const pendingCount = certificatesByProject[project.uid] || 0; // Calcular el pendingCount específico para cada proyecto

        return (
          <CardItem
            key={project.uid}
            icon={<FaUser size={56}/>}
            project={project}
            role={role}
            pendingCount={pendingCount} // Pasar el pendingCount específico al CardItem
          />
        );
      })}
    </div>
  );
};

export default ProjectsCards;

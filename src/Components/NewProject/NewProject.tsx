import React, { useState, useEffect } from "react";
import useManageProjects from "../../Hook/useManageProjects"; 
import { useUserStore } from "../../Context/context";
import { ProjectType } from "../../TypeScript/Types/types";

const NewProject: React.FC = () => {
  // Estado para determinar si se va a actualizar
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDeactivate, setIsDeactivate] = useState(false); 
  const [projectData, setProjectData] = useState<ProjectType & { nit: string; activo?: boolean }>({
    uid: "",
    projectTitle: "",
    nit: "",
    activo: true,
  });
  // Seleciona el proyecto con el id [uid]
  const [selectedProjectUid, setSelectedProjectUid] = useState<string | null>(
    null
  );
 
  const { createProject, updateProject, loading, error } = useManageProjects();
  const { projects } = useUserStore();

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mode = e.target.value;
    setIsUpdate(mode === "update");
    setIsDeactivate(mode === "deactivate"); 

    if (mode === "create") {
      setProjectData({
        projectTitle: ""
      });
      setSelectedProjectUid(null);
    }

    if (mode === "update" || mode === "deactivate") {
      setFilteredProjects(projects.filter((proj) => proj.activo !== false));

    }
  };

  const handleProjectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUid = e.target.value;
    setSelectedProjectUid(selectedUid);
    const selectedProject = projects.find((proj) => proj.uid === selectedUid);
    if (selectedProject) {
      setProjectData({
        uid: selectedProject.uid,
        projectTitle: selectedProject.projectTitle,
        nit: (selectedProject as any).nit || "",
        uid: selectedUid,
        activo: (selectedProject as any).activo ?? true,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUpdate && selectedProjectUid) {
      await updateProject(selectedProjectUid, {
        projectTitle: projectData.projectTitle,
        nit: projectData.nit,
        activo: projectData.activo,
      });
      console.log("Proyecto actualizado con éxito");
    } else if (isDeactivate && selectedProjectUid) {
      await updateProject(selectedProjectUid, {
        projectTitle: projectData.projectTitle,
        nit: projectData.nit,
        activo: false,
      });
      console.log("Proyecto desactivado con éxito");
    } else {
      await createProject({
        projectTitle: projectData.projectTitle,
        nit: projectData.nit,
        uid: "",
        activo: projectData.activo,
      });
      console.log("Proyecto creado con éxito");
    }

    setProjectData({
      uid: "",
      projectTitle: "",
      nit: "",
      uid: "",
      activo: true,
    });
    setSelectedProjectUid(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (!isOpen) return null;
  
  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      {/* Selector para elegir entre crear o actualizar */}
      <div className="mb-5">
        <label
          htmlFor="mode"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Modo
        </label>
        <select
          id="mode"
          onChange={handleModeChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="create">Crear proyecto</option>
          <option value="update">Actualizar proyecto</option>
        </select>
      </div>

      {/* Mostrar selector de proyectos si se está en modo actualizar */}
      {isUpdate && (
        <div className="mb-5">
          <label
            htmlFor="selectProject"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Elige el proyecto
          </label>
          <select
            id="selectProject"
            onChange={handleProjectSelect}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Seleccione un proyecto</option>
            {projects.map((project) => (
              <option key={project.uid} value={project.uid}>
                {project.projectTitle}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Campos de entrada para el título, descripción y número */}
      <div className="mb-5">
        <label
          htmlFor="projectTitle"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nombre del proyecto
        </label>
        <input
          type="text"
          id="projectTitle"
          name="projectTitle"
          value={projectData.projectTitle}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Proyecto..."
          required
        />
      </div>

      {/* <div className="mb-5">
        <label
          htmlFor="projectDescription"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Descripción del proyecto
        </label>
        <input
          type="text"
          id="nit"
          name="nit"
          value={projectData.nit}
          onChange={handleChange}
          disabled={isDeactivate}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
            isDeactivate ? "opacity-70 cursor-not-allowed" : ""
          } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          placeholder="Ej: 123456789 - 1"
          required={!isDeactivate}
        />
      </div>

      {/* <div className="mb-5">
        <label
          htmlFor="projectNumber"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Número del proyecto
        </label>
        <input
          type="number"
          id="projectNumber"
          name="projectNumber"
          value={projectData.projectNumber}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Número..."
        />
      </div> */}

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {loading ? "Procesando..." : isUpdate ? "Actualizar" : "Crear"}
      </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        <button className="mt-4 bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default NewProject;

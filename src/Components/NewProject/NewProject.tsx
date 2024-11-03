import React, { useState } from "react";
import useManageProjects from "../../Hook/useManageProjects"; // Asegúrate de que la ruta sea correcta
// import { useGetProjectsFromFirestore } from "../../Hook/useGetProjectsFromFirestore"; // Hook para obtener proyectos
import { useUserStore } from "../../Context/context";
import { ProjectType } from "../../TypeScript/Types/types";

const NewProject: React.FC = () => {
  // Estado para determinar si se va a actualizar
  const [isUpdate, setIsUpdate] = useState(false);
  const [projectData, setProjectData] = useState<ProjectType>({
    uid: "",
    projectTitle: "",
  });
  // Seleciona el proyecto con el id [uid]
  const [selectedProjectUid, setSelectedProjectUid] = useState<string | null>(
    null
  );

  const { createProject, updateProject, loading, error } = useManageProjects();
  // Obtiene todos los proyectos para mostrarlos en el select
  const { projects } = useUserStore();

  // Manejador para cambiar entre crear proyecto y actualizarlo
  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mode = e.target.value;
    setIsUpdate(mode === "update");
    if (mode === "create") {
      setProjectData({
        projectTitle: "",
        // projectDescription: "",
        // projectNumber: 0,
      });
      setSelectedProjectUid(null);
    }
  };

  // Manejador para seleccionar un proyecto y cargar los datos
  const handleProjectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUid = e.target.value;
    setSelectedProjectUid(selectedUid);
    const selectedProject = projects.find((proj) => proj.uid === selectedUid);
    if (selectedProject) {
      setProjectData({
        projectTitle: selectedProject.projectTitle,
        // projectDescription: selectedProject.projectDescription || "",
        // projectNumber: selectedProject.projectNumber || 0,
      });
    }
  };

  // Manejador para el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isUpdate && selectedProjectUid) {
      // Si se está actualizando y hay un UID seleccionado, actualiza el proyecto
      await updateProject(selectedProjectUid, {
        projectTitle: projectData.projectTitle,
        // projectDescription: projectData.projectDescription,
        // projectNumber: projectData.projectNumber,
      });
      console.log("Proyecto actualizado con éxito");
    } else {
      // De lo contrario, crea un nuevo proyecto
      await createProject(projectData);
      console.log("Proyecto creado con éxito");
    }

    // Reiniciar los campos del formulario
    setProjectData({
      projectTitle: "",
      // projectDescription: "",
      // projectNumber: 0,
    });
    setSelectedProjectUid(null);
  };

  // Manejador para cambiar los valores de los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
          <option value="create">Crear Proyecto</option>
          <option value="update">Actualizar Proyecto</option>
        </select>
      </div>

      {/* Mostrar selector de proyectos si se está en modo actualizar */}
      {isUpdate && (
        <div className="mb-5">
          <label
            htmlFor="selectProject"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Seleccionar Proyecto
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
          id="projectDescription"
          name="projectDescription"
          value={projectData.projectDescription}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Descripción..."
        />
      </div> */}

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
  );
};

export default NewProject;

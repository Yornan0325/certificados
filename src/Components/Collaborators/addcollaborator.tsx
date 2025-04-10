import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {agregarColaboradorAProyecto,obtenerColaboradoresPorProyecto,} from "../../ServicesFirebase/colaboradoresService";
import { toast } from "react-hot-toast"; 

const AddCollaborator = () => {
  const { proyectoID } = useParams<{ proyectoID: string }>();

  const [collaborator, setCollaborator] = useState({
    contractType: "",
    fullName: "",
    idNumber: "",
    startDate: "",
    position: "",
    salary: "",
    severanceFund: "",
    isRetired: false,
    endDate: "",
  });

  const [colaboradores, setColaboradores] = useState<any[]>([]);

  useEffect(() => {
    const fetchColaboradores = async () => {
      if (!proyectoID) return;
      try {
        const lista = await obtenerColaboradoresPorProyecto(proyectoID);
        setColaboradores(lista || []);
      } catch (error) {
        console.error("Error al obtener colaboradores:", error);
      }
    };

    fetchColaboradores();
  }, [proyectoID]);

  useEffect(() => {
    if (proyectoID) {
      console.log("ID del proyecto desde useParams:", proyectoID);
    } else {
      console.warn("No se encontró el ID del proyecto.");
    }
  }, [proyectoID]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCollaborator((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!proyectoID) {
      toast.error("No se encontró el ID del proyecto.");
      return;
    }

    try {
      for (const key in collaborator) {
        if (
          key !== "isRetired" &&
          key !== "endDate" &&
          !collaborator[key as keyof typeof collaborator]
        ) {
          toast.error("Todos los campos son obligatorios.");
          return;
        }
      }

      await agregarColaboradorAProyecto(proyectoID, collaborator);
      toast.success("Colaborador agregado correctamente");

      setCollaborator({
        contractType: "",
        fullName: "",
        idNumber: "",
        startDate: "",
        position: "",
        salary: "",
        severanceFund: "",
        isRetired: false,
        endDate: "",
      });

      const listaActualizada = await obtenerColaboradoresPorProyecto(proyectoID);
      setColaboradores(listaActualizada || []);
    } catch (error: any) {
      console.error("Error al agregar colaborador:", error);
      toast.error(error.message || "Hubo un error al agregar el colaborador.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-10"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Agregar Colaborador
      </h2>

      <label className="block text-sm font-medium text-gray-600">
        Tipo de contrato
      </label>
      <select
        name="contractType"
        value={collaborator.contractType}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg mb-3"
        required
      >
        <option value="">Seleccione</option>
        <option value="INDEFINIDO">Contrato a término indefinido</option>
        <option value="OBRA">Contrato obra o labor</option>
      </select>

      <input
        type="text"
        name="fullName"
        placeholder="Nombre completo"
        className="w-full p-2 border rounded-lg mb-3"
        value={collaborator.fullName}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="idNumber"
        placeholder="Cédula"
        className="w-full p-2 border rounded-lg mb-3"
        value={collaborator.idNumber}
        onChange={handleChange}
        required
      />

      <label className="block text-sm font-medium text-gray-600">
        Fecha de ingreso
      </label>
      <input
        type="date"
        name="startDate"
        className="w-full p-2 border rounded-lg mb-3"
        value={collaborator.startDate}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="position"
        placeholder="Cargo"
        className="w-full p-2 border rounded-lg mb-3"
        value={collaborator.position}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="salary"
        placeholder="Sueldo"
        className="w-full p-2 border rounded-lg mb-3"
        value={collaborator.salary}
        onChange={handleChange}
        required
      />

      {/* Fondo de Cesantías */}
      <label className="block text-sm font-medium text-gray-600">
        Fondo de Cesantías
      </label>
      <select
        name="severanceFund"
        value={collaborator.severanceFund}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg mb-3"
        required
      >
        <option value="">Seleccione una opción</option>
        <option value="PORVENIR">Porvenir</option>
        <option value="PROTECCION">Protección</option>
        <option value="COLFONDOS">Colfondos</option>
        <option value="FNA">Fondo Nacional del Ahorro (FNA)</option>
        <option value="COLPENSIONES">Colpensiones</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Guardar Colaborador
      </button>
    </form>
  );
};

export default AddCollaborator;

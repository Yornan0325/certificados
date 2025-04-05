import React, { useState, useEffect } from "react";
import { agregarColaborador, obtenerColaboradores } from "../../ServicesFirebase/colaboradoresService";

const AddCollaborator = () => {
  const [collaborator, setCollaborator] = useState({
    contractType: "",
    fullName: "",
    idNumber: "",
    startDate: "",
    position: "",
    salary: "",
    isRetired: false, // nuevo campo
    endDate: "",       // nuevo campo
  });

  const [colaboradores, setColaboradores] = useState<any[]>([]);

  useEffect(() => {
    const fetchColaboradores = async () => {
      try {
        const lista = await obtenerColaboradores();
        setColaboradores(lista || []);
      } catch (error) {
        console.error("Error al obtener colaboradores:", error);
      }
    };

    fetchColaboradores();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCollaborator((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validar campos obligatorios
      for (const key in collaborator) {
        if (
          key !== "isRetired" && // no requerido
          key !== "endDate" && // no requerido
          !collaborator[key as keyof typeof collaborator]
        ) {
          alert("Todos los campos son obligatorios.");
          return;
        }
      }

      // Verificar duplicado
      const existeColaborador = colaboradores.some(
        (colab) =>
          colab.idNumber.trim() === collaborator.idNumber.trim() ||
          colab.fullName.trim().toLowerCase() === collaborator.fullName.trim().toLowerCase()
      );

      if (existeColaborador) {
        alert("Error: El ID o el Nombre ya están registrados.");
        return;
      }

      // Agregar colaborador
      await agregarColaborador(collaborator);
      alert("Colaborador agregado correctamente");

      // Limpiar formulario
      setCollaborator({
        contractType: "",
        fullName: "",
        idNumber: "",
        startDate: "",
        position: "",
        salary: "",
        isRetired: false,
        endDate: "",
      });

      const listaActualizada = await obtenerColaboradores();
      setColaboradores(listaActualizada || []);
    } catch (error) {
      console.error("Error al agregar colaborador:", error);
      alert("Hubo un error al agregar el colaborador.");
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

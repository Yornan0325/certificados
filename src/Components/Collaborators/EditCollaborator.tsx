import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../ServicesFirebase/firebase";
import { Pencil, Check } from "lucide-react";

type Collaborator = {
  fullName: string;
  idNumber: string;
  contractType: string;
  position: string;
  salary: string;
  startDate: string;
  endDate?: string;
  isRetired?: boolean;
};

const fieldLabels: Record<string, string> = {
  fullName: "Nombre completo",
  idNumber: "Cédula",
  contractType: "Tipo de contrato",
  position: "Cargo",
  salary: "Salario",
  startDate: "Fecha de inicio",
};

const EditCollaborator = () => {
  const [collaborators, setCollaborators] = useState<{ id: string; fullName: string; idNumber: string }[]>([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<typeof collaborators>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [collaboratorData, setCollaboratorData] = useState<Collaborator | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [retired, setRetired] = useState(false);

  useEffect(() => {
    const fetchCollaborators = async () => {
      const snapshot = await getDocs(collection(db, "colaboradores"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        fullName: doc.data().fullName,
        idNumber: doc.data().idNumber,
      }));
      setCollaborators(data);
      setFiltered(data);
    };

    fetchCollaborators();
  }, []);

  useEffect(() => {
    const fetchCollaborator = async () => {
      if (!selectedId) return;
      const docRef = doc(db, "colaboradores", selectedId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCollaboratorData(docSnap.data() as Collaborator);
        setRetired(!!docSnap.data().isRetired);
      }
    };

    fetchCollaborator();
  }, [selectedId]);

  const handleUpdate = async () => {
    if (!selectedId || !collaboratorData) return;

    const updatedData = {
      ...collaboratorData,
      isRetired: retired,
    };

    try {
      await updateDoc(doc(db, "colaboradores", selectedId), updatedData);
      alert("Colaborador actualizado correctamente.");
      setIsEditing(false);
    } catch (err) {
      console.error("Error al actualizar:", err);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    const filteredResults = collaborators.filter((colab) =>
      `${colab.fullName} ${colab.idNumber}`.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(filteredResults);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Editar Colaborador</h2>

      <input
        type="text"
        placeholder="Buscar colaborador por nombre o cédula"
        className="w-full border p-2 rounded-md mb-2"
        value={search}
        onChange={handleSearchChange}
      />

      {search && (
        <ul className="border rounded-md max-h-40 overflow-y-auto mb-4 bg-white shadow-md">
          {filtered.map((colab) => (
            <li
              key={colab.id}
              onClick={() => {
                setSelectedId(colab.id);
                setSearch(`${colab.fullName} - ${colab.idNumber}`);
                setFiltered([]);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {colab.fullName} - {colab.idNumber}
            </li>
          ))}
        </ul>
      )}

      {collaboratorData && (
        <div className="border p-4 rounded-md shadow-md bg-white relative">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute right-4 top-4 text-blue-500 hover:text-blue-700"
            >
              <Pencil />
            </button>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(collaboratorData).map(([key, value]) =>
              key !== "isRetired" && key !== "endDate" ? (
                <div key={key}>
                  <label className="block font-semibold">
                    {fieldLabels[key] || key}
                  </label>
                  <input
                    type="text"
                    value={value as string}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setCollaboratorData((prev) => ({
                        ...prev!,
                        [key]: e.target.value,
                      }))
                    }
                    className="w-full border p-2 rounded-md"
                  />
                </div>
              ) : null
            )}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={retired}
              disabled={!isEditing}
              onChange={(e) => setRetired(e.target.checked)}
            />
            <label>Retirado</label>
          </div>

          {retired && (
            <div className="mt-2">
              <label className="block font-semibold">Fecha de Liquidación</label>
              <input
                type="date"
                disabled={!isEditing}
                value={collaboratorData?.endDate || ""}
                onChange={(e) =>
                  setCollaboratorData((prev) => ({
                    ...prev!,
                    endDate: e.target.value,
                  }))
                }
                className="border p-2 rounded-md"
              />
            </div>
          )}

          {isEditing && (
            <button
              onClick={handleUpdate}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <Check className="w-5 h-5" /> Guardar Cambios
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EditCollaborator;

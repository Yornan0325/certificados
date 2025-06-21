import { useState } from "react";
import { FaLock, FaDownload, FaClock } from "react-icons/fa";
import useCollaborators from "../../Hook/useCollaborators";
import { uploadPDF } from "../../ServicesFirebase/colaboradoresService";

const DocumentTable = () => {
  const projectId = "Ti58DXDqEYKuCbBk9tXGw";
  const collaborators = useCollaborators(projectId);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState<{ [key: string]: boolean }>({});

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !selectedUser || !selectedType) return;
    // Verificar si el usuario ya tiene el documento subido
    const docKey = `${selectedUser}-${selectedType}`;
    const url = await uploadPDF(e.target.files[0], selectedUser, selectedType);
    setUploadedDocs((prev) => ({
      ...prev,
      [docKey]: true,
    }));
    console.log("Archivo subido:", url);
  };

  const isComplete = (userId: string) =>
    uploadedDocs[`${userId}-CertificadoLaboral`] && uploadedDocs[`${userId}-RetiroCesantias`];

  return (
    <>
      <div className="flex gap-4 m-4 items-center">
        <input
        type="select"
          list="colaboradores"
          placeholder="Buscar colaborador..."
          className="border px-4 py-2 rounded-lg w-60"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        />
        <datalist id="colaboradores">
          {collaborators.map((c) => (
            <option key={c.id} value={c.id}>{c.fullName}</option>
          ))}
        </datalist>

        <select
          className="border px-4 py-2 rounded-lg"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Tipo de documento</option>
          <option value="CertificadoLaboral">Certificado Laboral</option>
          <option value="RetiroCesantias">Solicitud Retiro Cesantías</option>
        </select>

        <label className="cursor-pointer px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
          Subir PDF
          <input type="file" accept="application/pdf" hidden onChange={handleUpload} />
        </label>
      </div>

      <div className="p-4 flex flex-col items-center">
        <table className="min-w-full border-t border-b border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Nombre</th>
              <th className="px-4 py-2 border-b">Tipo Documento</th>
              <th className="px-4 py-2 border-b">Solicitud</th>
              <th className="px-4 py-2 border-b">Certificado</th>
              <th className="px-4 py-2 border-b">Estado</th>
            </tr>
          </thead>
          <tbody>
            {collaborators.map((colab) => (
              <tr key={colab.id} className="text-center">
                <td className="px-4 py-2 border-b">
                  <p>{colab.fullName}</p>
                  <p className="text-sm text-gray-500">{colab.idNumber}</p>
                </td>
                <td className="px-4 py-2 border-b">Certificado Laboral</td>
                <td className="px-4 py-2 border-b text-blue-600">
                  <FaLock className="inline mr-2" />
                  <span className="text-sm">10/12/2024</span>
                </td>
                <td className="px-4 py-2 border-b text-blue-600">
                  <FaDownload className="inline mr-2" />
                  <span className="text-sm">10/12/2024</span>
                </td>
                <td
                  className={`px-4 py-2 border-b font-bold ${
                    isComplete(colab.id) ? "text-green-600" : "text-yellow-500"
                  }`}
                >
                  {isComplete(colab.id) ? "Completo" : "Pendiente"}
                </td>
                <td className="px-4 py-2 border-b text-gray-600">
                  <button className="flex items-center gap-1 hover:text-blue-600">
                    <FaClock /> Historial
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DocumentTable;
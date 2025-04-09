import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, FileText, Upload } from "lucide-react";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../ServicesFirebase/firebase";
import HeaderText from "../HeaderText/HeaderText";
import { useUserStore } from "../../Context/context";
import { CertificateType } from "../../TypeScript/Types/types";

const StaffList = () => {
  const navigate = useNavigate();
  const { selectedProjectsUid } = useUserStore();
  const [certificates, setCertificates] = useState<CertificateType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!selectedProjectsUid) return;

      try {
        const certificatesCollection = collection(db, "certificados");
        const q = query(certificatesCollection, where("projectUid", "==", selectedProjectsUid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const fetchedCertificates: CertificateType[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as unknown as CertificateType[];

          setCertificates(fetchedCertificates);
        }
      } catch (error) {
        console.error("Error al obtener los certificados:", error);
      }
    };

    fetchCertificates();
  }, [selectedProjectsUid]);

  const handleDownload = async (certificateUid: string) => {
    try {
      const fileRef = ref(storage, `certificados/${certificateUid}.pdf`);
      const url = await getDownloadURL(fileRef);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error al descargar el documento:", error);
      alert("No se pudo descargar el archivo.");
    }
  };

  const handleUpload = async (certificateUid: string, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileRef = ref(storage, `certificados/${certificateUid}.pdf`);

      try {

        await uploadBytes(fileRef, file);
        const fileUrl = await getDownloadURL(fileRef);

        const docRef = doc(db, "certificados", certificateUid);
        await updateDoc(docRef, {
          fileUrl, 
        });

        setCertificates((prev) =>
          prev.map((cert) =>
            cert.certificateUid === certificateUid ? { ...cert, fileUrl } : cert
          )
        );

        alert("Archivo subido correctamente y guardado en la base de datos.");
      } catch (error) {
        console.error("Error al subir el archivo:", error);
        alert("No se pudo subir el archivo.");
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center px-6 py-4">
        <HeaderText title="Pedidos" />
        <div className="flex space-x-4">
          <div className="relative">
            <button
              className="px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-gray-50"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Colaboradores <ChevronDown className="h-5 w-5" />
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                <button onClick={() => navigate("/admin/agregar-colaborador")} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                  Agregar Colaborador
                </button>
                <button onClick={() => navigate("/admin/editar-colaborador")}className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                Editar Colaborador
                </button>
              </div>
            )}
          </div>
          <button className="px-4 py-2 border rounded-md hover:bg-gray-50">Historial</button>
        </div>
      </div>

      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex gap-4 mb-6 relative">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">NOMBRE</th>
                <th className="py-3 px-4 text-left">PROYECTO</th>
                <th className="py-3 px-4 text-left">TIPO</th>
                <th className="py-3 px-4 text-left">SOLICITUD</th>
                <th className="py-3 px-4 text-left">CERTIFICADO</th>
                <th className="py-3 px-4 text-left">ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((user) => (
                <tr key={user.certificateUid} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">{user.certificateUid}</td>
                  <td className="py-3 px-4">{user.person}</td>
                  <td className="py-3 px-4">{user.nameProject}</td>
                  <td className="py-3 px-4">{user.certificateType}</td>
                  <td className="py-3 px-4">
                    <button onClick={() => handleDownload(user.certificateUid)} className="hover:bg-gray-100 p-1 rounded-full transition-colors">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <label className="cursor-pointer hover:bg-gray-100 p-1 rounded-full transition-colors">
                      <input type="file" className="hidden" onChange={(e) => handleUpload(user.certificateUid, e)} />
                      <Upload className="h-5 w-5 text-blue-600" />
                    </label>
                  </td>
                  <td className="py-3 px-4 text-blue-600">{user.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StaffList;

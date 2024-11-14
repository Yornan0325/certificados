import React, { useEffect, useState } from "react";
import { Search, ChevronDown, FileText, Upload, Check } from "lucide-react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../ServicesFirebase/firebase"; // Asegúrate de crear este archivo
import HeaderText from "../HeaderText/HeaderText";
import Modal from "../Modal/Modal";
import { useUserStore } from "../../Context/context";
import { CertificateType } from "../../TypeScript/Types/types";
import { collection, getDocs, query, where } from "firebase/firestore";

// interface UserType {
//   id: number;
//   certificateType: string;
//   person: string;
//   certificateUid: string;
//   nameProject: string;
//   projectUid: string;
//   state: string;
//   date: string;
// }

const StaffList = () => {
  const { openModal } = useUserStore();
  const { selectedProjectsUid } = useUserStore();
  const [certificates, setCertificates] = useState<CertificateType[]>([]); // Estado para almacenar los certificados
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el buscador
  const [selectedUser, setSelectedUser] = useState<CertificateType | null>(
    null
  ); // Para guardar el documento seleccionado
  const [uploadStatus, setUploadStatus] = useState<
    "subiendo" | "exito" | "error" | null
  >(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!selectedProjectsUid) {
        // console.log("No hay UID de proyecto seleccionado.");
        return; // No hacer nada si no hay UID de proyecto
      }

      // console.log("UID del proyecto seleccionado:", selectedProjectsUid);

      try {
        const certificatesCollection = collection(db, "certificados"); // Referencia a la colección de certificados
        // Obtiene los datos del proyecto por el id del proyecto
        const q = query(
          certificatesCollection,
          where("projectUid", "==", selectedProjectsUid)
        ); // Consulta a Firestore
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log(
            "No se encontraron certificados para el proyecto:",
            selectedProjectsUid
          );
        } else {
          const fetchedCertificates: CertificateType[] = querySnapshot.docs.map(
            (doc) => ({
              id: doc.id, // Usa el ID del documento en Firestore
              ...doc.data(), // Obtén los datos del documento
            })
          ) as unknown as CertificateType[];

          console.log("Certificados obtenidos:", fetchedCertificates);
          setCertificates(fetchedCertificates); // Actualizar el estado con los certificados obtenidos
        }
      } catch (error) {
        console.error("Error al obtener los certificados:", error); // Manejo de errores
      }
    };

    fetchCertificates(); // Llamar a la función para obtener certificados
  }, [selectedProjectsUid]);

  const handleFileUpload = async (file: File) => {
    try {
      if (file.type !== "application/pdf") {
        throw new Error("Por favor, sube únicamente archivos PDF");
      }

      if (file.size > 10 * 1024 * 1024) {
        throw new Error("El archivo no debe superar los 10MB");
      }

      setUploadStatus("subiendo");
      setErrorMessage("");

      // Crear una referencia única para el archivo
      const fileRef = ref(
        storage,
        `documentos/${selectedUser?.certificateUid}/${Date.now()}_${file.name}`
      );

      // Subir el archivo a Firebase Storage
      await uploadBytes(fileRef, file);

      // Obtener la URL de descarga
      const downloadURL = await getDownloadURL(fileRef);
      console.log("URL del archivo:", downloadURL);

      setUploadStatus("exito");
      setTimeout(() => {
        openModal(false);
        setUploadStatus(null);
      }, 1500);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Error al subir el archivo"
      );
      setUploadStatus("error");
      console.error("Error al subir el archivo:", error);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };
  // console.log( "certificates",certificates);
  const filteredUsers = certificates.filter((user) => {
    const searchFields = [
      user.person || "",
      user.certificateType || "",
      user.certificateUid || "",
      user.nameProject,
    ].map((field) => field.toLowerCase());

    return searchFields.some((field) =>
      field.includes(searchTerm.toLowerCase())
    );
  });

  const openUploadModal = (user: CertificateType) => {
    setSelectedUser(user);
    openModal(true);
    setUploadStatus(null);
    setErrorMessage("");
  };

  return (
    <>
      <HeaderText title="Pedidos" />
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Bucar..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
          </div>
          <button className="px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-gray-50">
            <ChevronDown className="h-5 w-5" />
          </button>
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
              {filteredUsers.map((user) => (
                <tr
                  key={user.certificateUid}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">{user.certificateUid}</td>
                  <td className="py-3 px-4">
                    <div>
                      <div>{user.person}</div>
                      {/* <div className="text-sm text-gray-500">{user.certificateUid}</div> */}
                    </div>
                  </td>
                  <td className="py-3 px-4">{user.nameProject}</td>
                  <td className="py-3 px-4">{user.certificateType}</td>

                  <td className="py-3 px-4 items-center">
                    <button
                      onClick={() => openUploadModal(user)}
                      className="hover:bg-gray-100 p-1 rounded-full transition-colors items-center"
                    >
                      <FileText className="h-5 w-5 text-gray-600" />
                    </button>
                    <span className="text-sm text-gray-500">10/12/2024</span>
                  </td>

                  <td className="py-3 px-4 justify-center ">
                    <button
                      onClick={() => openUploadModal(user)}
                      className="hover:bg-gray-100 p-1 rounded-full transition-colors"
                    >
                      <FileText className="h-5 w-5 text-gray-600" />
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`${
                        user.state === "Pendiente"
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    >
                      {user.state}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal title={selectedUser?.person || ""}>
          {selectedUser && (
            <div className="space-y-4">
              <div className="text-sm text-gray-500">
                <div className="text-sm text-gray-500">
                  Arrastra y suelta el PDF aquí, o haz clic para seleccionar
                </div>
              </div>

              {uploadStatus === "exito" ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-green-800">
                    Documento subido exitosamente
                  </span>
                </div>
              ) : (
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  } ${uploadStatus === "subiendo" ? "opacity-50" : ""}`}
                  onDragEnter={handleDragIn}
                  onDragLeave={handleDragOut}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Upload className="h-12 w-12 text-gray-400" />
                  </div>

                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      if (e.target.files) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>
              )}

              {uploadStatus === "error" && (
                <div className="text-red-600">{errorMessage}</div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default StaffList;

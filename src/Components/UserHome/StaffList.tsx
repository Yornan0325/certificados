import React, { useState } from 'react';
import { Search, ChevronDown, FileText, X, Upload, Check } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../ServicesFirebase/firebase'; // Asegúrate de crear este archivo
import HeaderText from '../HeaderText/HeaderText';
import NavBar from '../NavBar/NavBar';

interface User {
  id: number;
  nombre: string;
  documento: string;
  proyecto: string;
  tipo: string;
  estado: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'uploading' | 'success' | 'error' | null>(null);
  // const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const users: User[] = [
    {
      id: 1,
      nombre: 'Juan Camilo Rios',
      documento: '1063497234',
      proyecto: 'Consorcio puerto mallarino',
      tipo: 'Cetifiado laboral',
      estado: 'Pendiente'
    },
    {
      id: 2,
      nombre: 'Maria González',
      documento: '1063497235',
      proyecto: 'Proyecto Santa Marta',
      tipo: 'Certificado laboral',
      estado: 'Completado'
    }
  ];

  const handleFileUpload = async (file: File) => {
    try {
      if (file.type !== 'application/pdf') {
        throw new Error('Por favor, sube únicamente archivos PDF');
      }

      if (file.size > 10 * 1024 * 1024) {
        throw new Error('El archivo no debe superar los 10MB');
      }

      setUploadStatus('uploading');
      setErrorMessage('');
      
      // Crear una referencia única para el archivo
      const fileRef = ref(storage, `documentos/${selectedUser?.documento}/${Date.now()}_${file.name}`);
      
      // Subir el archivo a Firebase Storage
      const uploadTask = uploadBytes(fileRef, file);
      
      // Manejar la subida
      await uploadTask;
      
      // Obtener la URL de descarga
      const downloadURL = await getDownloadURL(fileRef);
      
      // Aquí podrías guardar la URL en tu base de datos si lo necesitas
      console.log('URL del archivo:', downloadURL);
      
      setUploadStatus('success');
      setTimeout(() => {
        setIsModalOpen(false);
        setUploadStatus(null);
        // setUploadProgress(0);
      }, 1500);
      
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Error al subir el archivo');
      setUploadStatus('error');
      console.error('Error al subir el archivo:', error);
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

  const filteredUsers = users.filter(user => {
    const searchFields = [
      user.nombre,
      user.documento,
      user.proyecto,
      user.tipo,
      user.estado
    ].map(field => field.toLowerCase());

    return searchFields.some(field => field.includes(searchTerm.toLowerCase()));
  });

  const openUploadModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setUploadStatus(null);
    setErrorMessage('');
  };

  return (
    <> 
    <NavBar
      imgUser={""}
      name="Certificados"
      logoState="logo"
      dimention="w-12 h-12"
      showItem={false}
    />
    <HeaderText title="Pedidos" />
    <div className="p-6 max-w-5xl mx-auto">      
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
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
              <th className="py-3 px-4 text-left">DOCUMENTO</th>
              <th className="py-3 px-4 text-left">ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">{user.id}</td>
                <td className="py-3 px-4">
                  <div>
                    <div>{user.nombre}</div>
                    <div className="text-sm text-gray-500">{user.documento}</div>
                  </div>
                </td>
                <td className="py-3 px-4">{user.proyecto}</td>
                <td className="py-3 px-4">{user.tipo}</td>
                <td className="py-3 px-4">
                  <button 
                    onClick={() => openUploadModal(user)}
                    className="hover:bg-gray-100 p-1 rounded-full transition-colors"
                  >
                    <FileText className="h-5 w-5 text-gray-600" />
                  </button>
                </td>
                <td className="py-3 px-4">
                  <span className={`${user.estado === 'Pendiente' ? 'text-blue-600' : 'text-green-600'}`}>
                    {user.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Subir Documento"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="text-sm text-gray-500">
              Subir documento para: <span className="font-medium text-gray-900">{selectedUser.nombre}</span>
            </div>

            {uploadStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-green-800">Documento subido exitosamente</span>
              </div>
            ) : (
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
                  isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                } ${uploadStatus === 'uploading' ? 'opacity-50' : ''}`}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center gap-2">
                  <Upload className={`h-10 w-10 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Click para subir</span> o arrastra y suelta
                  </div>
                  <div className="text-xs text-gray-500">
                    PDF (MAX. 10MB)
                  </div>
                </div>
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  accept=".pdf"
                />
              </div>
            )}

            {uploadStatus === 'uploading' && (
              <div className="text-sm text-center text-gray-500">
                Subiendo documento...
              </div>
            )}

            {uploadStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                {errorMessage}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
    </>
  );
};

export default UsersTable;
import { useEffect, useState } from "react";
import { getPendingUsers, activateUser } from "../../ServicesFirebase/authService";

interface User {
  id: string;
  email: string;
  name: string;
  consorcio?: string;
  activo: boolean;
}

const AdminApprovalModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchUsers = async () => {
      const pendingUsers = await getPendingUsers();
      console.log("Usuarios pendientes:", pendingUsers); 
      setUsers(pendingUsers);
    };

    fetchUsers();
  }, [isOpen]);

  const handleApprove = async (userId: string) => {
    await activateUser(userId);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-lg font-bold mb-4">Usuarios Pendientes</h2>
        <ul>
          {users.length === 0 ? (
            <p className="text-gray-500">No hay usuarios pendientes.</p>
          ) : (
            users.map((user) => (
              <li key={user.id} className="flex justify-between items-center mb-2 p-2 border rounded">
                <div>
                  <p><strong>{user.name}</strong></p>
                  <p>{user.email}</p>
                  <p>{user.consorcio || "Sin consorcio"}</p>
                </div>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded"
                  onClick={() => handleApprove(user.id)}
                >
                  ✅
                </button>
              </li>
            ))
          )}
        </ul>
        <button className="mt-4 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AdminApprovalModal;

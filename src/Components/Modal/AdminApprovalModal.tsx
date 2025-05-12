import { useEffect, useState } from "react";
import {
  getPendingUsers,
  activateUserWithRoleAndConsorcio,
  rejectUser,
  getConsorcios,
} from "../../ServicesFirebase/authService";

interface User {
  id: string;
  email: string;
  name: string;
  consorcio?: string;
  check: boolean;
}

const AdminApprovalModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Record<string, string>>({});
  const [selectedConsorcio, setSelectedConsorcio] = useState<Record<string, string>>({});
  const [consorcios, setConsorcios] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      const [pendingUsers, consorcioList] = await Promise.all([
        getPendingUsers(),
        getConsorcios(),
      ]);
      setUsers(pendingUsers);
      setConsorcios(consorcioList);
    };

    fetchData();
  }, [isOpen]);

  const handleApprove = async (userId: string) => {
    const rol = roles[userId];
    const consorcio = selectedConsorcio[userId];

    if (!rol || !consorcio) {
      alert("Debe seleccionar rol y consorcio antes de aprobar.");
      return;
    }

    await activateUserWithRoleAndConsorcio(userId, rol, consorcio);
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const handleReject = async (userId: string) => {
    await rejectUser(userId);
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-lg font-bold mb-4">Usuarios Pendientes</h2>
        <ul>
          {users.length === 0 ? (
            <p className="text-gray-500">No hay usuarios pendientes.</p>
          ) : (
            users.map((user) => (
              <li
                key={user.id}
                className="mb-4 p-4 border rounded flex flex-col md:flex-row justify-between gap-2"
              >
                <div>
                  <p><strong>{user.name}</strong></p>
                  <p>{user.email}</p>
                  <p>{user.consorcio || "Sin consorcio"}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <select
                    className="border px-2 py-1 rounded"
                    value={roles[user.id] || ""}
                    onChange={(e) =>
                      setRoles((prev) => ({ ...prev, [user.id]: e.target.value }))
                    }
                  >
                    <option value="">Seleccione rol</option>
                    <option value="SISO">SISO</option>
                    <option value="Auxiliar">Auxiliar</option>
                  </select>

                  <select
                    className="border px-2 py-1 rounded"
                    value={selectedConsorcio[user.id] || ""}
                    onChange={(e) =>
                      setSelectedConsorcio((prev) => ({
                        ...prev,
                        [user.id]: e.target.value,
                      }))
                    }
                  >
                    <option value="">Seleccione consorcio</option>
                    {consorcios.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  <div className="flex gap-2">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded"
                      onClick={() => handleApprove(user.id)}
                    >
                      ✅ Aprobar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                      onClick={() => handleReject(user.id)}
                    >
                      ❌ Rechazar
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
        <button className="mt-4 bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AdminApprovalModal;
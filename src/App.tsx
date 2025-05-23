import { Routes, Route, Navigate } from "react-router-dom"; 
import { LoginPage } from "./Pages/AdminPages/LoginPage";
import { SignUpPage } from "./Pages/AdminPages/SignUpPage";
import { AdminHomePage } from "./Pages/AdminPages/AdminHomePage";
import { GuestHomePage } from "./Pages/GuestPage/GuestHomePage";
import { useGetAuthenticatedUser } from "./Hook/useGetAuthenticatedUser";
import { PrivateRoute } from "./RestrictedAccess/PrivateRoute";
import { useHandleAuthSigOut } from "./Hook/useHandleAuthSigOut";
import { useHandleUser } from "./Hook/useUser";
import StaffList from "./Components/UserHome/StaffList";
import NewProject from "./Components/NewProject/NewProject";
import RecoverPasswordPage from "./UserForm/FormModules/RecoverPasswordPage"; 
import AdminApprovalModal from "./Components/Modal/AdminApprovalModal";
import { useState } from "react";
import AddCollaborator from "./Components/Collaborators/addcollaborator";
import EditCollaborator from "./Components/Collaborators/EditCollaborator"; 
import { Toaster } from "react-hot-toast"; 

const App: React.FC = () => {
  useGetAuthenticatedUser();
  useHandleUser();

  const { signOutSesion } = useHandleAuthSigOut();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogOut = async () => {
    await signOutSesion();
  };

  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/registro" element={<SignUpPage />} />
      <Route  path="/admin/:routeParams" element={<StaffList />} />
      <Route  path="/admin/nuevo/:routeParams" element={<NewProject/>} />
      <Route  path="/admin/agregar-colaborador/:routeParams" element={<AddCollaborator/>} />
      <Route  path="/admin/editar-colaborador/:routeParams" element={<EditCollaborator/>} />

      
      <Route
        path="/admin"
        element={
          <PrivateRoute role={["admin"]}>
            <AdminHomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/invitado"
        element={
          <PrivateRoute role={["invitado"]}>
             <GuestHomePage />
            <button onClick={handleLogOut} className="btn btn-logout">
              Salir
            </button>
            <h1 className="mx-12 my-12 bg-red-500">Invitado</h1>
            {/* <SignOutButton/>  */}
          </PrivateRoute>
        }
      />
       <Route path="/recuperar-contraseña" element={<RecoverPasswordPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>

    {isModalOpen && (
        <AdminApprovalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}

      <Toaster position="top-right" /> 
    </>
  );
};

export default App;

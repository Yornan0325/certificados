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
import RecoverPasswordPage from "./UserForm/FormModules/RecoverPasswordPage"; // ✅ Importación corregida

const App: React.FC = () => {
  useGetAuthenticatedUser();
  useHandleUser();

  const { signOutSesion } = useHandleAuthSigOut();

  const handleLogOut = async () => {
    await signOutSesion();
  };

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/registro" element={<SignUpPage />} />
      <Route path="/admin/:routeParams" element={<StaffList />} />
      <Route path="/admin/nuevo/:routeParams" element={<NewProject />} />
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
          </PrivateRoute>
        }
      />

      <Route path="/recuperar-contraseña" element={<RecoverPasswordPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;

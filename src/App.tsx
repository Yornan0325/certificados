import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";
import { SignUpPage } from "./Pages/SignUpPage";
import { HomePage } from "./Pages/HomePage";
import { useHandleUser } from "./Hook/useUser";
import { PrivateRoute } from "./RestrictedAccess/PrivateRoute";
import { useHandleAuthSigOut } from "./Hook/useHandleAuthSigOut";

const App: React.FC = () => {
  useHandleUser();
  // useDataUsers();
  const { signOutSesion } = useHandleAuthSigOut();

  const handleLogOut = async () => {
    await signOutSesion();
    // Puedes redirigir al usuario a la página de login o landing después de cerrar sesión, si es necesario
    // Por ejemplo, utilizando react-router: navigate("/login")
  };

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/registro" element={<SignUpPage />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute role={["admin"]}>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/invitado"
        element={
          <PrivateRoute role={["invitado"]}>
            <button onClick={handleLogOut} className="btn btn-logout">
              Cerrar sesión
            </button>
            <h1 className="mx-12 my-12 bg-red-500">Invitado</h1>
            {/* <SignOutButton/>  */}
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";
import { SignUpPage } from "./Pages/SignupPage";
import { HomePage } from "./Pages/HomePage";
import { useHandleUser } from "./Hook/useUser";
import { PrivateRoute } from "./RestrictedAccess/PrivateRoute";
import { useHandleAuthLogin } from "./Hook/useHandleAuthLogOut";

const App: React.FC = () => {
  useHandleUser();
  // useDataUsers();
  const { logOut } = useHandleAuthLogin();

  const handleLogOut = async () => {
    await logOut();
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

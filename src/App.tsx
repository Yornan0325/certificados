import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";
import { HomePage } from "./Pages/HomePage";
// import { useHandleUser } from "./Hooks/useUser";
import { PrivateRoute } from "./RestrictedAccess/PrivateRoute";


const App: React.FC = () => {
  // useHandleUser();
  // useDataUsers();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
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
            <div>Ivitado</div>
            {/* <SignOutButton/>  */}
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;

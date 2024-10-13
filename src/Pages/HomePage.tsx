import HeaderText from "../Components/HeaderText/HeaderText";
import { useHandleAuthLogin } from "../Hook/useHandleAuthLogOut";

export const HomePage = () => {
  const { logOut } = useHandleAuthLogin();

  const handleLogOut = async () => {
    await logOut();
    // Puedes redirigir al usuario a la página de login o landing después de cerrar sesión, si es necesario
    // Por ejemplo, utilizando react-router: navigate("/login")
  };
  return (
    <>
     <button onClick={handleLogOut} className="btn btn-logout">
        Cerrar sesión
      </button>
    <h1>Administrador</h1>
      <HeaderText title="Usuarios" />
    </>
  );
};

import HeaderText from "../Components/HeaderText/HeaderText";
import NavBar from "../Components/NavBar/NavBar";
// import { useHandleAuthSigOut } from "../Hook/useHandleAuthSigOut";

export const HomePage = () => {
  // const { signOutSesion } = useHandleAuthSigOut();

  // const handleLogOut = async () => {
  //   await signOutSesion();
   
  // };
  return (
    <>
    <NavBar
      imgUser={""}
      name="Certificados"
      logoState="logo"
      dimention="w-12 h-12"
      showItem={true}
    />
    <HeaderText title="Usuarios" />
    </>
  );
};

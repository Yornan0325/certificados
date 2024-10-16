import HeaderText from "../Components/HeaderText/HeaderText";
import NavBar from "../Components/NavBar/NavBar";
// import { useHandleAuthSigOut } from "../Hook/useHandleAuthSigOut";

export const HomePage = () => {
 
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

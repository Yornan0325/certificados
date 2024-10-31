import HeaderText from "../Components/HeaderText/HeaderText";
import NavBar from "../Components/NavBar/NavBar";
// import { useHandleAuthSigOut } from "../Hook/useHandleAuthSigOut";
import Card from "../Components/UserHome/Card"
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
    <Card/>
    </>
  );
};

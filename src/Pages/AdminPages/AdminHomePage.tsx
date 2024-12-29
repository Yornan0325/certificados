import HeaderText from "../../Components/HeaderText/HeaderText";
import NavBar from "../../Components/NavBar/NavBar";
// import { useHandleAuthSigOut } from "../Hook/useHandleAuthSigOut";
import ProjectsCards from "../../Components/UserHome/ProjectsCards";
import NavBarHome from "../../Components/NavBar/NavBarHome";
import Modal from "../../Components/Modal/Modal";
import NewProject from "../../Components/NewProject/NewProject";
// import DocumentTable from "../../Components/Invitado/DocumentTable";
 

export const AdminHomePage = () => {
 

  return (
    <>
      <NavBar>
        <NavBarHome
          name={"Certificados"}
          imgUser={""}
          logoState={"logo"}
          dimention={"w-12 h-12"}
          showItem={true}
          children={undefined}
        />
      </NavBar>
      <HeaderText title="Consorcios" />
      <ProjectsCards />
      {/* <DocumentTable/> */}
      <Modal title="Crea o Edita los proyectos">
        <NewProject />
      </Modal>
      
    </>
  );
};

import HeaderText from "../../Components/HeaderText/HeaderText"; 
import NavBar from "../../Components/NavBar/NavBar";
import NavBarHome from "../../Components/NavBar/NavBarHome";
// import Modal from "../../Components/Modal/Modal";
// import NewProject from "../../Components/NewProject/NewProject";
import DocumentTable from "../../Components/Siso/DocumentTable";

export const GuestHomePage = () => {
  return (
    <>
      <NavBar>
        <NavBarHome
          name={"Certificados"}
          imgUser={""}
          logoState={"logo"}
          dimention={"w-12 h-12"}
          showItem={true}

        />
      </NavBar>

      <HeaderText title="Sisos" />
      <DocumentTable/>

      {/* <Modal title="Crea o Edita los proyectos">
        <NewProject isOpen={false} onClose={function (): void {
          throw new Error("Function not implemented.");
        } }/>
      </Modal> */}
    </>
  );
};

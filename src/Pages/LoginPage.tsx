import LoginForm from "../UserForm/LoginForm";
import Header from "../UserForm/FormModules/Header";
import { LIST_DATA_LOGIN } from "../UserForm/FormModules/formFields";
import fondo from "../Components/Imagenes/fondo.jpeg";
import logoImage from "../Components/Imagenes/logoImage.jpeg";
import Avatar from "../Components/Avatar/Avatar";

export const LoginPage: React.FC = () => {
  return (
    <>
      <div className=" max-w-lg px-4 mx-auto mt-2 bg-gray-200 sm:shadow-md sm::rounded-md sm:bg-gray-100 sm:p-6 md:bg-green-100">
        <div className="max-w-md w-full lg:space-y-16 space-y-32">
          <div
            className="absolute bg-cover bg-clip-border bg-center shadow-none inset-0 m-0 h-full w-full object-cover z-0 overflow-hidden rounded-none bg-transparent"
            style={{ backgroundImage: `url(${fondo})` }}
          >
            {/* <div className="absolute bg-cover bg-clip-border bg-center shadow-none inset-0 m-0 h-full w-full object-cover z-0 overflow-hidden rounded-none bg-transparent bg-[url('https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"> */}
            <div className="absolute inset-0 w-full h-full bg-black from-black/80 via-black/50 opacity-60"></div>
            <div className="flex items-center justify-center w-28 h-28 my-8 mx-4 rounded-full border-2 border-white object-center">
              <div className="w-24 h-24 rounded-full overflow-hidden relative bg-white">
                <Avatar dimention={"w-24 h-24 "} logoImage={logoImage} />
              </div>
            </div>
          </div>
          <div className="relative md:px-4">
            <Header
              heading="Ingrese a su cuenta"
              paragraph="Aún no tienes una cuenta?"
              linkName="Registrate"
              linkUrl="/registro"
            />
            <div className="relative p-4 z-10">
              <LoginForm LIST_DATA_LOGIN={LIST_DATA_LOGIN} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

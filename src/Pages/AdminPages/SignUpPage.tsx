import Header from "../../UserForm/FormModules/Header";
import Avatar from "../../Components/Avatar/Avatar";
import logoImage from "../../Components/Imagenes/logoImage.jpeg";
import fondo from "../../Components/Imagenes/fondo.jpeg";
import { LIST_DATA_SIGNUP } from "../../UserForm/FormModules/formFields";
import SignUpForm from "../../UserForm/SignUpForm";

export const SignUpPage: React.FC = () => {
  return (
    <>
      <div className=" max-w-lg px-4 mx-auto bg-gray-200 ">
        <div className="max-w-md w-full  lg:space-y-8  space-y-32   ">
          {/* <div className=" max-w-lg p-4 mx-auto mt-4 bg-gray-200 sm:shadow-md sm::rounded-md sm:bg-gray-100 sm:p-6 md:bg-green-100"> */}
          <div
            className="absolute bg-cover bg-clip-border bg-center shadow-none inset-0 m-0 h-full w-full object-cover z-0 overflow-hidden rounded-none bg-transparent"
            style={{ backgroundImage: `url(${fondo})` }}
          >
            <div className="absolute object-cover z-0 inset-0 w-full h-auto bg-black from-black/80 via-black/50 opacity-60"></div>
            <div className="flex items-center justify-center  w-28 h-28 my-8 mx-4  rounded-full border-2 border-white  object-center    ">
              <div className="w-24 h-24 rounded-full overflow-hidden relative items-center justify-center  bg-white">
                <Avatar dimention={"w-24 h-24 "} logoImage={logoImage} />
              </div>
            </div>
          </div>

          <div className="relative md:m-4">
            <Header
              heading="Crea una cuenta"
              paragraph="Ya tienes una cuenta?"
              linkName="Inicia sesion"
              linkUrl="/"
            />

            <div className="relative  p-4 z-10">
              <SignUpForm LIST_DATA_SIGNUP={LIST_DATA_SIGNUP} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

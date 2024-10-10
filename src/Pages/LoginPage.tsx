import LoginForm from "../UserForm/LoginForm";
import Header from "../UserForm/FormModules/Header";
import { LIST_DATA_LOGIN } from "../UserForm/FormModules/formFields";

export const LoginPage: React.FC = () => {
  return (
    <>
      <div className=" max-w-lg px-4 mx-auto mt-2 bg-gray-700 sm:shadow-md sm::rounded-md sm:bg-gray-700 sm:p-6 md:bg-white-700">
        <div className="max-w-md w-full lg:space-y-16 space-y-32">
          <div className="relative md:px-4">
            <Header
              heading="Ingrese a su cuenta"
              paragraph="Aún no tienes una cuenta?"
              linkName="Registrate"
              linkUrl="/registro"
            />
            <div className="relative p-10 z-10">
              <LoginForm LIST_DATA_LOGIN={LIST_DATA_LOGIN} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

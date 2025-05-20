import { LoginFields } from "./FormModules/formFields";
import ActionButton from "./FormModules/ActionButton";
import FormExtra from "./FormModules/FormExtra";
import FormInput from "./FormModules/FormInput";
import { useEffect } from "react";
import { useUserStore } from "../Context/context";
import { useNavigate } from "react-router-dom";
import { useHandleAuthSignIn } from "../Hook/useHandleAuthSignIn";
import useFormInput from "../Hook/useFormInput";

const LoginForm: React.FC<{ LIST_DATA_LOGIN: LoginFields[] }> = ({
  LIST_DATA_LOGIN,
}) => {
  const { handleSignIn } = useHandleAuthSignIn();
  const { formValues, isLoading, setIsLoading, setError, error, handleChange } =
    useFormInput({
      initialState: { email: "", password: "" },
    });
  const { userAuth, userRole,dataUser } = useUserStore();
  const navigate = useNavigate();
 

  // Obtener el rol del usuario
 
  useEffect(() => {
    if (!userAuth?.email || !userRole) return;
  
    // Buscar el usuario actual en dataUser
    const currentUser = dataUser.find(user => user.email === userAuth.email);
  
    const isChecked  = currentUser?.check === true;
  
    if (userRole === "administrador" && isChecked ) {
      navigate("/administrador");
    } else if (userRole === "siso" && isChecked ) {
      navigate("/siso");
    } else if (userRole === "auxiliar" && isChecked ) {
      navigate("/auxiliar");
    } else {
      navigate("/");
    }
  }, [userRole, navigate, userAuth?.email, dataUser]);
  // useEffect(() => {
  //   if (userAuth?.email && userRole) {
  //     if (userRole === "administrador" && check===true) {
  //       navigate("/administrador");
  //     } else if (userRole === "siso" && check===true) {
  //       navigate("/siso");
  //     } else if (userRole === "auxiliar" && check=== false ) {
  //       navigate("/auxiliar")
  //     } else {
  //       navigate("/")
  //     }
  //   }
  // }, [userRole, navigate, userAuth?.email]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSignIn(
      formValues.email,
      formValues.password,
      setIsLoading,
      setError
    );
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        {LIST_DATA_LOGIN.map(
          ({
            id,
            name,
            type,
            isRequired,
            autoComplete,
            placeholder,
            icons,
          }: LoginFields) => (
            <FormInput
              key={id}
              name={name}
              type={type}
              value={formValues[name] || ""}
              placeholder={placeholder}
              autoComplete={autoComplete}
              isRequired={isRequired}
              handleChange={handleChange}
              id={id}
              icon={icons ? icons : { icon_A: null, icon_B: null }}
            />
          )
        )}

        {error && <div className="text-blue-700">{error}</div>}
      </div>

      <FormExtra />
      <div className="flex mt-12">
        <ActionButton text="Iniciar sesión" isLoading={isLoading} />
      </div>
    </form>
  );
};

export default LoginForm;

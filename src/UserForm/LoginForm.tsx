import { LoginFields } from "./FormModules/formFields";
import ActionButton from "./FormModules/ActionButton";
import FormExtra from "./FormModules/FormExtra";
import FormInput from "./FormModules/FormInput";
import { useEffect } from "react";
import { useUserStore  } from "../Context/context";
import { useNavigate } from 'react-router-dom'
import { useHandleAuthSignIn } from "../Hook/useHandleAuthSignIn";
import useFormInput from "../Hook/useFormInput";
 

const LoginForm: React.FC<{ LIST_DATA_LOGIN: LoginFields[] }> = ({
  LIST_DATA_LOGIN,
}) => {
  const { handleSignIn } = useHandleAuthSignIn();
  // const {  handleChange,  input, isLoading } = useHandleAuthLogin();
  const { formValues, isLoading, setIsLoading, setError, error, handleChange } = useFormInput({
    initialState: { email: "", password: "" },
  });
  const { userAuth, userRole } = useUserStore ();
  const navigate = useNavigate();
  
  // const userRole= "admin"
  // const userRole= "invitado"
  useEffect(() => {
    if (userAuth?.email && userRole) {
      if (userRole === "admin") {
        navigate('/admin')
      } else if (userRole === "invitado") {
        navigate('/invitado')
      } else {
        navigate('/')
      }
    }
  }, [userRole, navigate, userAuth?.email]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSignIn(formValues.email, formValues.password,setIsLoading,setError);
  };
// console.log("email",input.email)
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
      <div className="flex mt-12 ">
        <ActionButton text="Iniciar sesion" isLoading={isLoading}/>
      </div>
    </form>
  );
};

export default LoginForm;

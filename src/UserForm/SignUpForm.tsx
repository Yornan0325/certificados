import { LoginFields } from "./FormModules/formFields";
import ActionButton from "./FormModules/ActionButton";
import FormExtra from "./FormModules/FormExtra";
import FormInput from "./FormModules/FormInput";
import useFormInput from "../Hook/useFormInput";
import { useHandleAuthSignUp } from "../Hook/useHandleAuthSignUp"; 

const SignUpForm: React.FC<{ LIST_DATA_SIGNUP: LoginFields[] }> = ({ LIST_DATA_SIGNUP }) => {
  // Utiliza el hook de registro
  const { handleSignUp } = useHandleAuthSignUp();

  const { formValues, isLoading,setIsLoading,setError, error, handleChange } = useFormInput({
    initialState: { email: "", password: "",  username: "" },
  });

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Llamar a la función de registro con los datos del formulario
    await handleSignUp(formValues.email, formValues.password, formValues.username,setIsLoading,setError);
  // console.log(formValues)
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {LIST_DATA_SIGNUP.map(({ id, name, type, isRequired, autoComplete, placeholder, icons }: LoginFields) => (
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
        ))}
      </div>

      {/* Mostrar mensajes de error si los hay */}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <FormExtra />
      <div className="flex">
        <ActionButton text="Registrarme" isLoading={isLoading} />
      </div>
    </form>
  );
};

export default SignUpForm;
import { LoginFields } from "./FormModules/formFields";
import ActionButton from "./FormModules/ActionButton";
import FormExtra from "./FormModules/FormExtra";
import FormInput from "./FormModules/FormInput";
import { useEffect } from "react";
import { useUserStore } from "../Context/context";
import { useNavigate } from "react-router-dom";
import { useHandleAuthSignIn } from "../Hook/useHandleAuthSignIn";
import useFormInput from "../Hook/useFormInput";
import { auth, db, doc, getDoc } from "../ServicesFirebase/firebase";



const LoginForm: React.FC<{ LIST_DATA_LOGIN: LoginFields[] }> = ({
  LIST_DATA_LOGIN,
}) => {
  const { handleSignIn } = useHandleAuthSignIn();
  const {
    formValues,
    isLoading,
    setIsLoading,
    setError,
    error,
    handleChange,
  } = useFormInput({
    initialState: { email: "", password: "" },
  });

  const {
    userAuth,
    userRole,
    dataUser,
    setDataAuthenticatedUser,
  } = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userAuth?.email || !userRole) return;

    const currentUser = dataUser.find((user) => user.email === userAuth.email);
    const isChecked = currentUser?.check === true;

    if (userRole === "administrador" && isChecked) {
      navigate("/administrador");
    } else if (userRole === "siso" && isChecked) {
      navigate("/siso");
    } else if (userRole === "auxiliar" && isChecked) {
      navigate("/auxiliar");
    } else {
      navigate("/");
    }
  }, [userRole, navigate, userAuth?.email, dataUser]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await handleSignIn(
      formValues.email,
      formValues.password,
      setIsLoading,
      setError
    );

    const currentUser = auth.currentUser;

    if (currentUser?.email) {
      const docRef = doc(db, "usuarios", currentUser.email);
      const userSnap = await getDoc(docRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();

        // Guardar los datos completos del usuario autenticado (incluyendo consorcio)
        setDataAuthenticatedUser([
          {
            uid: userData.uid,
            email: userData.email,
            name: userData.name,
            role: userData.role,
            consorcio: userData.consorcio,
            check: userData.check,
          },
        ]);
      }
    }
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

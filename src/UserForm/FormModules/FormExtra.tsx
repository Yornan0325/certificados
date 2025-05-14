import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FormExtra = () => {
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Recuperar el estado guardado en localStorage
    const savedRemember = localStorage.getItem("rememberMe");
    if (savedRemember === "true") {
      setRememberMe(true);
    }
  }, []);

  const handleRememberMeChange = () => {
    const newValue = !rememberMe;
    setRememberMe(newValue);
    localStorage.setItem("rememberMe", JSON.stringify(newValue));
  };

  return (
    <div className="flex items-center justify-between">
      {/* ✅ Opción "Recordarme" implementada */}
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          checked={rememberMe}
          onChange={handleRememberMeChange}
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
        <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
          Recordarme
        </label>
      </div>

      {/* ✅ Link para recuperar contraseña (sin cambios) */}
      <div className="text-sm ml-12">
        <Link to="/recuperar-contraseña" className="font-medium text-blue-300 hover:text-blue-500">
          Recuperar contraseña?
        </Link>
      </div>
    </div>
  );
};

export default FormExtra;

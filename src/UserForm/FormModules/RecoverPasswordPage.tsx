import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../ServicesFirebase/firebase"; 
import { useNavigate } from "react-router-dom";

const RecoverPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Por favor, ingresa tu correo electrónico.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Se ha enviado un correo con instrucciones para restablecer tu contraseña.");
      setTimeout(() => navigate("/"), 5000); // Redirigir al login después de 5 segundos
    } catch (error: any) {
      setError("Error al enviar el correo. Verifica que el correo esté registrado.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Recuperar Contraseña</h2>
        <p className="text-sm text-center text-gray-600">Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.</p>

        {message && <p className="text-green-500 text-center mt-2">{message}</p>}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handlePasswordReset} className="mt-4">
          <label className="block text-gray-700">Correo Electrónico:</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Enviar enlace de recuperación
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="/" className="text-blue-500 hover:underline">Volver al inicio de sesión</a>
        </div>
      </div>
    </div>
  );
};

export default RecoverPasswordPage;

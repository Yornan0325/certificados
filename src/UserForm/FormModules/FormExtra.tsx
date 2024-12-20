const FormExtra = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        {/* <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
        <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
          Acuérdate de mí
        </label> */}
      </div>

      <div className="text-sm ml-12">
        <a
          href="#"
          className="font-medium text-blue-300 hover:text-blue-500"
        >
          Recuperar contraseña?
        </a>
      </div>
    </div>
  );
};

export default FormExtra;

import React, { useState } from "react";

interface LoginFields {
  type: string;
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id: string;
  isRequired?: boolean;
  placeholder: string;
  autoComplete: string;
  icon: {
    icon_A: React.ReactNode;
    icon_B: React.ReactNode;
  };
}

const FormInput: React.FC<LoginFields> = ({
  type,
  name,
  handleChange,
  autoComplete,
  value,
  id,
  isRequired = true,
  placeholder,
  icon,
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const inputType = showPassword && type === "password" ? "password" : "text";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container max-w-full mx-auto">
      <div className="font-sans">
        <div className="max-w-sm mx-auto">
          <div className="w-full relative">
            <div className="mx-auto max-w-lg">
              <div className="py-2">
                <input
                  onChange={handleChange}
                  value={value}
                  id={id}
                  name={name}
                  required={isRequired}
                  autoComplete={autoComplete}
                  type={inputType}
                  placeholder={placeholder}
                  className="text-md block px-3 py-2 rounded-lg w-full 
                    bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                    focus:placeholder-gray-500
                    focus:bg-white 
                    focus:border-gray-600  
                    focus:outline-none"
                />
              </div>
              {type === "password" ? (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-4 end-2  rounded-e-md"
                >
                  {" "}
                  <div className="h-2 text-gray-700">
                    {showPassword
                      ? icon.icon_A
                      : icon.icon_B}
                  </div>
                </button>
              ) : null}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormInput;

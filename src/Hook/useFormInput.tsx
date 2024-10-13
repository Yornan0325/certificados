import { useState } from "react";

interface UseFormInputProps {
  initialState: { [key: string]: string };
}

interface FormInputState {
  formValues: { [key: string]: string };
  isLoading: boolean;
  error: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const useFormInput = ({ initialState }: UseFormInputProps): FormInputState => {
  const [formValues, setFormValues] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return {
    formValues,
    isLoading,
    error,
    handleChange,
    setIsLoading,
    setError,
  };
};

export default useFormInput;

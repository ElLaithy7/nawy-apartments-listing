import { useState } from "react";
import * as yup from "yup";

type ValidationErrors = {
  [key: string]: string; // Maps field names to error messages
};

export default function useYupValidation<T>(schema: yup.Schema<T>) {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isValid, setIsValid] = useState(true);

  const validate = async (data: T): Promise<boolean> => {
    try {
      await schema.validate(data, { abortEarly: false });
      setErrors({}); // Clear errors if validation succeeds
      setIsValid(true);
      return true; // Validation passed
    } catch (err) {
      const validationErrors: ValidationErrors = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path || ""] = error.message; // Get errors
        });
      }
      setErrors(validationErrors);
      setIsValid(false);
      return false; // Validation invalid
    }
  };

  return { errors, validate, isValid };
}

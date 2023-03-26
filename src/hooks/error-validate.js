import { useEffect, useState } from 'react';

export const useErrorVaidate = (schemaValidation, textValidation, typeValidation) => {
  const [errorsArray, setErrorsArray] = useState([]);

  const validateUsername = (typeValidation, value) => {
    if (typeValidation === 'username') {
      return { username: `${value}` };
    }
    if (typeValidation === 'login') {
      return { login: `${value}` };
    }
    if (typeValidation === 'password') {
      return { password: `${value}}` };
    }

    return {};
  };

  useEffect(() => {
    const validate = async (value) => {
      try {
        const result = await schemaValidation.validate(validateUsername(typeValidation, value), {
          abortEarly: false,
        });

        if (result) {
          setErrorsArray([]);
        }
      } catch (error) {
        setErrorsArray(error.errors);
      }
    };

    validate(textValidation);
  }, [textValidation, schemaValidation, typeValidation]);

  return { errorsArray };
};

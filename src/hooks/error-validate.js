import { useEffect, useState } from 'react';

export const useErrorVaidate = (schemaValidation, textValidation, typeValidation) => {
  const [errorsArray, setErrorsArray] = useState([]);

  useEffect(() => {
    switch (typeValidation) {
      case 'username':
        {
          const validate = async (username) => {
            try {
              const result = await schemaValidation.validate(
                {
                  username,
                },
                { abortEarly: false }
              );

              if (result) {
                setErrorsArray([]);
              }
            } catch (error) {
              setErrorsArray(error.errors);
            }
          };

          validate(textValidation);
        }
        break;

      case 'password':
        {
          const validate = async (password) => {
            try {
              const result = await schemaValidation.validate(
                {
                  password,
                },
                { abortEarly: false }
              );

              if (result) {
                setErrorsArray([]);
              }
            } catch (error) {
              setErrorsArray(error.errors);
            }
          };

          validate(textValidation);
        }
        break;

      default:
        break;
    }
  }, [textValidation, schemaValidation, typeValidation]);

  return { errorsArray };
};

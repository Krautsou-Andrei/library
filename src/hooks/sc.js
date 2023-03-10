import { useEffect, useState } from 'react';

export const useErrorVaidate = (schemaValidation, textValidationOne, textValidationTwo) => {
  const [errorsArray, setErrorsArray] = useState([]);

  useEffect(() => {
    const validate = async (username, password) => {
      try {
        console.log('username', username, password);
        const result = await schemaValidation.validate(
          {
            username,
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

    validate(textValidationOne, textValidationTwo);
  }, [textValidationOne, textValidationTwo, schemaValidation, typeValidation]);

  console.log('errorsArray', errorsArray);
  console.log('schemaValidation', schemaValidation);

  return { errorsArray };
};

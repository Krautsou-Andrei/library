import { object, string, lazy, ref } from 'yup';

export const authenticationSchema = object({
  identifier: string().required('Поле не может быть пустым'),
  password: string().required('Поле не может быть пустым'),
});

export const registerStepOneSchema = object({
  username: string()
    .required('Поле не может быть пустым')
    .matches(/(?=.*[A-Za-z]).{1,}/, 'латинский алфавит')
    .matches(/(?=.*\d).{1,}/, 'цифры'),
  password: string()
    .required('Поле не может быть пустым')
    .matches(/[A-Za-z0-9]{8,}/, 'не менее 8 символов')
    .matches(/(?=.*[A-Z])/, 'с заглавной буквой')
    .matches(/(?=.*[0-9])/, 'цифрой'),
});

export const registerStepTwoSchema = object({
  lastName: string().required('Поле не может быть пустым'),
  firstName: string().required('Поле не может быть пустым'),
});

export const registerStepThreeSchema = object({
  phone: string()
    .required('Поле не может быть пустым')
    .matches(
      /^\+?375((\s\(33\)\s\d{3}-\d{2}-\d{2})|(\s\(29\)\s\d{3}-\d{2}-\d{2})|(\s\(44\)\s\d{3}-\d{2}-\d{2})|(\s\(25\)\s\d{3}-\d{2}-\d{2}))\s*$/,
      'В формате +375 (xx) xxx-xx-xx'
    ),
  email: string()
    .required('Поле не может быть пустым')
    .matches(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      'Введите корректный e-mail'
    ),
});

export const forgotPasswordSchema = object({
  email: string()
    .required('Поле не может быть пустым')
    .matches(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      'Введите корректный e-mail'
    ),
});

export const recovetyPasswordSchema = object({
  password: string()
    .required('Поле не может быть пустым')
    .matches(/[0-9a-zA-Z]{8,}/, 'не менее 8 символов')
    .matches(/(?=.*[A-Z])/, 'с заглавной буквой')
    .matches(/(?=.*[0-9])/, 'цифрой'),
  passwordConfirmation: lazy((value) =>
    string().when('passwordConfirmation', (any, schema) =>
      value === ''
        ? schema.required('Поле не может быть пустым')
        : schema.oneOf([ref('password')], 'Пароли не совпадают')
    )
  ),
});

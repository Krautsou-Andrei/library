import { object, string, lazy, ref } from 'yup';
import { RegExp } from './regexp';

export const authenticationSchema = object({
  identifier: string().required('Поле не может быть пустым'),
  password: string().required('Поле не может быть пустым'),
});

export const registerStepOneSchema = object({
  username: string()
    .required('Поле не может быть пустым')
    .matches(RegExp.leastOneLatinLetter, 'латинский алфавит')
    .matches(RegExp.leastOneDigit, 'цифры'),
  password: string()
    .required('Поле не может быть пустым')
    .matches(RegExp.leastEightCharacters, 'не менее 8 символов')
    .matches(RegExp.capitalized, 'с заглавной буквой')
    .matches(RegExp.numbers, 'цифрой'),
});

export const registerStepTwoSchema = object({
  lastName: string().required('Поле не может быть пустым'),
  firstName: string().required('Поле не может быть пустым'),
});

export const registerStepThreeSchema = object({
  phone: string().required('Поле не может быть пустым').matches(RegExp.phoneNumber, 'В формате +375 (xx) xxx-xx-xx'),
  email: string().required('Поле не может быть пустым').matches(RegExp.email, 'Введите корректный e-mail'),
});

export const forgotPasswordSchema = object({
  email: string().required('Поле не может быть пустым').matches(RegExp.email, 'Введите корректный e-mail'),
});

export const recovetyPasswordSchema = object({
  password: string()
    .required('Поле не может быть пустым')
    .matches(RegExp.leastEightCharacters, 'не менее 8 символов')
    .matches(RegExp.capitalized, 'с заглавной буквой')
    .matches(RegExp.numbers, 'цифрой'),
  passwordConfirmation: lazy((value) =>
    string().when('passwordConfirmation', (any, schema) =>
      value === ''
        ? schema.required('Поле не может быть пустым')
        : schema.oneOf([ref('password')], 'Пароли не совпадают')
    )
  ),
});

import { object, string, lazy, ref } from 'yup';
import { RegExp } from './regexp';

const value = {
  stringEmpty: string().required('Поле не может быть пустым'),
  username: string()
    .required('Поле не может быть пустым')
    .matches(RegExp.leastOneLatinLetter, 'латинский алфавит')
    .matches(RegExp.leastOneDigit, 'цифры'),
  password: string()
    .required('Поле не может быть пустым')
    .matches(RegExp.leastEightCharacters, 'не менее 8 символов')
    .matches(RegExp.capitalized, 'с заглавной буквой')
    .matches(RegExp.numbers, 'цифрой'),
  email: string().required('Поле не может быть пустым').matches(RegExp.email, 'Введите корректный e-mail'),
  phone: string().required('Поле не может быть пустым').matches(RegExp.phoneNumber, 'В формате +375 (xx) xxx-xx-xx'),
  passwordConfirmation: lazy((value) =>
    string().when('passwordConfirmation', (any, schema) =>
      value === ''
        ? schema.required('Поле не может быть пустым')
        : schema.oneOf([ref('password')], 'Пароли не совпадают')
    )
  ),
};

export const authenticationSchema = object({
  identifier: value.stringEmpty,
  password: value.stringEmpty,
});

export const registerStepOneSchema = object({
  username: value.username,
  password: value.password,
});

export const registerStepTwoSchema = object({
  lastName: value.stringEmpty,
  firstName: value.stringEmpty,
});

export const registerStepThreeSchema = object({
  phone: value.phone,
  email: value.email,
});

export const forgotPasswordSchema = object({
  email: value.email,
});

export const recovetyPasswordSchema = object({
  password: value.password,
  passwordConfirmation: value.passwordConfirmation,
});

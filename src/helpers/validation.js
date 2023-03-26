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

export const authenticationSchema = object().shape({
  identifier: value.stringEmpty,
  password: value.stringEmpty,
});

export const registerStepOneSchema = object().shape({
  username: value.username,
  password: value.password,
});

export const registerStepTwoSchema = object().shape({
  lastName: value.stringEmpty,
  firstName: value.stringEmpty,
});

export const registerStepThreeSchema = object().shape({
  phone: value.phone,
  email: value.email,
});

export const forgotPasswordSchema = object().shape({
  email: value.email,
});

export const recovetyPasswordSchema = object().shape({
  password: value.password,
  passwordConfirmation: value.passwordConfirmation,
});

export const editUserShema = object().shape({
  login: value.username,
  password: value.password,
  lastName: value.stringEmpty,
  firstName: value.stringEmpty,
  phone: string().matches(RegExp.phoneNumber, 'В формате +375 (xx) xxx-xx-xx'),
  email: value.email,
});

export const usernameShema = object().shape({
  username: value.username,
});

export const passwordShema = object().shape({
  password: value.password,
});

export const userSchema = object().shape({
  login: value.username,
  password: value.password,
});

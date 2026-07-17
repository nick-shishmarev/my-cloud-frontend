import { PASSWORD_MIN_LEN, USERNAME_MAX_LEN, USERNAME_MIN_LEN } from "../config/constants";

export function isValidUserName(username: string) {
  const nameRegex = /^[A-Za-z][A-Za-z0-9]+$/;

  if (username.length < USERNAME_MIN_LEN || username.length > USERNAME_MAX_LEN) {
    return false;
  }

  if (!nameRegex.test(username)) {
    return false;
  }

  return true;
}

export function isValidPassword(password: string) {

  if (password.length < PASSWORD_MIN_LEN) {
    return {fault: true, msg: `Длина пароля меньше ${PASSWORD_MIN_LEN}`};
  }

  if (!/[A-Z]/.test(password)) {
    return {fault: true, msg: `В пароле должна быть хотя бы одна заглавная буква`};
  }

  if (!/[a-z]/.test(password)) {
    return {fault: true, msg: `В пароле должна быть хотя бы одна строчная буква`};
  }

  if (!/[0-9]/.test(password)) {
    return {fault: true, msg: `В пароле должна быть хотя бы одна цифра`};
  }

  if (!/[@#$%&*()<>?!]/.test(password)) {
    return {fault: true, msg: `В пароле должен быть хотя бы один спецсимвол`};
  }

  return {fault: false, msg: `Пароль прошел проверку`};
}

export function isValidEmail(email:string) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

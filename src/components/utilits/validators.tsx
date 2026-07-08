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
    return false;
  }

  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[@#$%&*()<>?!]/.test(password);

  return hasUpper && hasDigit && hasSpecial;
}

export function isValidEmail(email:string) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

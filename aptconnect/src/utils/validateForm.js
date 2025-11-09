export function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export function isNotEmpty(value) {
  return value != null && String(value).trim().length > 0;
}

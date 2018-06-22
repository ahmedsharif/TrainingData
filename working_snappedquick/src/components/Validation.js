import validator from "validator";

export const EMAIL = value => {
  if (!validator.isEmail(value)) {
    return `${value} is not a valid email.`;
  }
};

export const required = value => {
  if (!value.toString().trim().length) {
    return "require";
  }
};

var initial_password = "";
export const PASSWORD = value => {
  if (value.toString().trim.length < 6) {
    return "password should be >=  6 digits";
  }
  initial_password = value;
};

export const CONFIRMPASSWORD = value => {
  if (initial_password !== value) {
    return "password does not match";
  }
};

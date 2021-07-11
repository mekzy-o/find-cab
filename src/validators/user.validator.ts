import * as yup from 'yup';

const phoneRegExp = /^([+]?\d{1,3}|)\d{3}\d{3}\d{4}$/;
export const signUpValidator = yup
  .object({
    name: yup.string().min(2).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    phone_number: yup.string().min(10).matches(phoneRegExp, 'Phone number is not valid').required(),
    license_number:yup.string().min(2).required(),
    car_number:yup.string().min(2).required()
  })
  .noUnknown();

  export const signInValidator = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .noUnknown();
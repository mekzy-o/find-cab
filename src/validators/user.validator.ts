import * as yup from 'yup';

const phoneRegExp = /^([+]?\d{1,3}|)\d{3}\d{3}\d{4}$/;
export const userValidator = yup
  .object({
    name: yup.string().min(2).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    phone_number: yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
    license_number:yup.string().min(2).required(),
    car_number:yup.string().min(2).required()
  })
  .noUnknown();
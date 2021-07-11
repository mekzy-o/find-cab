import * as yup from 'yup';

export const locationValidator = yup
  .object({
    latitude: yup.string().required(),
    longitude: yup.string().required(),
  })
  .noUnknown();
import argon2 from 'argon2';
import cryptoRandomString from 'crypto-random-string';
import { token } from 'morgan';
import { verifyUser } from '../controllers/verification.controller';
import { UserAttributes } from '../database/models/user';
import { ApplicationError } from '../lib';
import { User } from '../repository';
import { getAuthToken } from '../utils/auth';
import { filterOutPassword } from '../utils/filterOutPassword';
import { sendVerificationMail} from './email.service';
import verificationService from './verification.service';


// const validatePassword = async (email: string, password: string) => {
//   const foundUser = await userDAO.getUserByEmailForLogin(email);
//   return foundUser ? argon2.verify(foundUser.password, password) : false;
// };

export interface UserReturnedProp {
  token: string,
  user: {
  id?: number,
  name: string,
  email: string,
  password: string,
  phone_number: string,
  license_number: string,
  car_number: string,
  createdAt?: Date
  updatedAt?: Date
  }
}

const registerUser = async (body: UserAttributes, url:string): Promise<Boolean> => {
  const { email, password } = body;

  const foundUser = await User.getUserByEmail(email);

  if (foundUser) {
    throw new ApplicationError({ message: 'User with this email already exists' });
  }

  const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });

  const createdUser = await User.createUser({...body, password: hashedPassword});
  if (!createdUser) {
    throw new ApplicationError({ message: 'User not created for some reason' });
  }

  const token = getAuthToken({ email: createdUser.email, userId: createdUser.id });  
  const confirmationCode = cryptoRandomString(5);
  
  const saveDetailsToVerification = await verificationService.createUserVerification({token: confirmationCode, email:createdUser.email});
  if(!saveDetailsToVerification){
    throw new ApplicationError({ message: 'OOPss, Issues sending verification code, please try again' });
  }
  
   await sendVerificationMail(confirmationCode, createdUser.dataValues.email, token, url);
  
 return true;
};


export const loginUser = async (body: {email:string, password:string}) => {
  const { email, password } = body;
  
  const foundUser = await User.getUserByEmail(email);
  if (!foundUser) {
    throw new ApplicationError({ message: 'User with this email does not exist' });
  }

// @ts-ignore: Object is possibly 'null'
  const verifyPassword = await argon2.verify(foundUser.password, password);
  if(!verifyPassword){
    throw new ApplicationError({ message: 'Invalid Account details, Please try again' });
  }

  const token = getAuthToken({ email: foundUser.email, userId: foundUser.id }); 

// @ts-ignore: Object is possibly 'null'.
  return {token, ...filterOutPassword(foundUser)}
}
export default {
  registerUser,
  loginUser
};
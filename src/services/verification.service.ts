import jwt from 'jsonwebtoken';
import { Verification, User } from '../repository';
import { ApplicationError, errorResponse } from '../lib';
import { VerificationAttributes } from '../database/models/verification';
import  usersService  from './users.service';

/**
 * @export
 * @function getUsers
 * @returns {Object} object
 */
const createUserVerification = async (data: VerificationAttributes): Promise<VerificationAttributes | null> => {
  const verification = await Verification.create(data);
  return verification;
}

const verifyAndUpdateUserStatus = async(token: string, confirmationCode: string, email:string) => {
  jwt.verify(token, process.env.JWT_SECRET as any)as {userId: string};
  const foundUser = await User.getUserByEmail(email);
  if (!foundUser) {
    throw new ApplicationError({ message: 'User with this email does not exist' });
  }

  if(foundUser.status !=='inactive'){
    throw new ApplicationError({ message: 'You already verified your account' });
  }
 
  const foundConfirmationCode = await Verification.findByToken(confirmationCode);
  if(!foundConfirmationCode){
    throw new ApplicationError({ message: 'Verification code does not exist' });
  }

  //update status on user table
  const data = await usersService.updateUser(email);
  const user = data[1][0];
  return user;
 
} 

export default {
    createUserVerification,
    verifyAndUpdateUserStatus
}
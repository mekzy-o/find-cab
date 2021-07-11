import db from '../database/models';
import { User } from '../repository';
import { UserAttributes, UserInstance } from '../database/models/user';
import { ApplicationError } from '../lib';

/**
 * @export
 * @function getUsers
 * @returns {Object} object
 */
export const getUsers = async (): Promise<UserInstance[]> => {
  const users = await db.User.findAll() as UserInstance[];
  return users
}


export const getByUserEmail = async (email: string): Promise<UserAttributes | null> => {
  const user = await User.getUserByEmail(email);
  return user;
}

export const updateUser = async (email: string) => {
  const user = await User.updateUser(email);
  return user;
}

export const updateUserStatus = async (body: {email: string}) => {
  const { email } = body;
  const foundUser = await User.getUserByEmail(email);
  if (!foundUser) {
    throw new ApplicationError({ message: 'User with this email does not exist' });
  }

  // @ts-ignore: Object is possibly 'null'
  if(foundUser.status !== 'inactive'){
    throw new ApplicationError({ message: 'Account is already verified' });
  }

  const data = await User.updateUser(email);
  const user = data[1][0];
  return user;

}

export default {
  getUsers,
  getByUserEmail,
  updateUser, 
  updateUserStatus
}
import db from '../database/models';
import { User } from '../repository';
import { UserAttributes, UserInstance } from '../database/models/user';

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

export default {
  getUsers,
  getByUserEmail,
  updateUser
}
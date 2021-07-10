import db from '../database/models';
import { UserAttributes } from '../database/models/user';


export const getUserById = async (id : string) => {
    const user = await db.User.findOne({where:{id}})
    return user;
}


export const getUserByEmail = async(email: string) => {
    const user = await db.User.findOne({where:{email}})
    return user;
}

export const createUser = async(data: UserAttributes) => {
    const user = await db.User.create(data)
    return user;
}

export const updateUser = async(email: string) => {
    const user = await db.User.update({status: 'active'}, {returning: true, where:{email}});
    return user;
}
import db from '../database/models';
import { VerificationAttributes } from '../database/models/verification';

export const create = async(data: VerificationAttributes) => {
    const verification = await db.Verification.create(data)
    return verification;
}

export const findByEmail = async(email: string) => {
    const verification = await db.Verification.findOne({where: {email}});
    return verification;
}

export const findByToken = async(token: string) => {
    const verification = await db.Verification.findOne({where: {token}});
    return verification;
}
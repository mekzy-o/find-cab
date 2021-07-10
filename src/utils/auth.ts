import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApplicationError } from '../lib';
import { User } from '../repository';

export interface DecodedToken {
  userId: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  decodedToken: DecodedToken;
}

const generateToken = (payload: any, expiryTime: string) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'smsmsms', { expiresIn: expiryTime });
};

export const getAuthToken = (payload: any) => {
  return generateToken(payload, '10h');
};

export const verifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new ApplicationError({ message: 'No token Provided', status: 401 });
  }

  if (authorization.split(' ')[0] !== 'Bearer') {
    throw new ApplicationError({ message: 'Invalid token supplied', status: 401 });
  }

  const [, token] = authorization.split(' ');

  const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || '');

  if (!(decodedToken.email && decodedToken.userId)) {
    throw new ApplicationError({ message: 'Invalid token supplied', status: 401 });
  }

  const { userId } = decodedToken;

  const foundUser = await User.getUserById(userId);

  if (!foundUser) {
    throw new ApplicationError({ message: 'Invalid token supplied', status: 401 });
  }

  req.decodedToken = decodedToken;

  return next();
};

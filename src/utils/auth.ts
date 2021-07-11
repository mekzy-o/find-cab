import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {errorResponse} from '../lib'
import { User } from '../repository';

const JWT_SECRET = process.env.JWT_SECRET;

export interface DecodedToken {
  userId: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  decodedToken: DecodedToken;
}

const generateToken = (payload: any, expiryTime: string) => {
  return jwt.sign(payload, process.env.JWT_SECRET as any, { expiresIn: expiryTime });
};

export const getAuthToken = (payload: any) => {
  return generateToken(payload, process.env.EXPIRY_TIME as any);
};

export const verifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
 try {
  const { authorization } = req.headers;

  if (!authorization) {
   return errorResponse({ res, message: 'No token Provided'});
  }

  if (authorization.split(' ')[0] !== 'Bearer') {
    return errorResponse({ res, message: 'Invalid token Provided', statusCode: 401});
  }

  const [, token] = authorization.split(' ');

  const decodedToken: any = jwt.verify(token, JWT_SECRET as any);

  if (!(decodedToken.email && decodedToken.userId)) {
    return errorResponse({ res, message: 'Invalid token Provided', statusCode: 401});
  }

  const { userId } = decodedToken;

  const foundUser = await User.getUserById(userId);

  if (!foundUser) {
    return errorResponse({ res, message: 'No token Provided', statusCode: 401});
  }

  req.decodedToken = decodedToken;

  return next();
}
catch(error){
  next(error);
}
};

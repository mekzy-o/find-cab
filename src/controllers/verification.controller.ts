import { Request, Response, NextFunction } from 'express';
import { successResponse } from '../lib';
import { authService, verificationService} from '../services';
import { filterOutPassword } from '../utils/filterOutPassword';

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  
  const confirmationCode = req.query.confirmationCode as string;
  const email = req.query.email as string;
  const token = req.query.token as string;

  try {
    const result = await verificationService.verifyAndUpdateUserStatus(token, confirmationCode, email);
    return successResponse({
      res,
      message:'Verification successlly, Please proceed to Login',
      data: {token, ...filterOutPassword(result)},
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const generateVerificationLink = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body, 'body');
    const url = `${req.protocol}://${req.headers['host']}/api/v1`;
    const result = await verificationService.generateVerificationLink(req.body, url);
    return successResponse({
      res,
      message:'Verification link generated successfully',
      data: result,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};
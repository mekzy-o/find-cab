import { Request, Response, NextFunction } from 'express';
import { successResponse } from '../lib';
import { verificationService} from '../services';
import { filterOutPassword } from '../utils/filterOutPassword';

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  
  const confirmationCode = req.query.confirmationCode as string;
  const email = req.query.email as string;
  const token = req.query.token as string

  try {
    const result = await verificationService.verifyAndUpdateUserStatus(confirmationCode, email);
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
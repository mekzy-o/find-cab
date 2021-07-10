import { Request, Response, NextFunction } from 'express';
import { successResponse } from '../lib';
import { authService } from '../services';
import { filterOutPassword } from '../utils/filterOutPassword';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const baseUrl = `${req.protocol}://${req.headers['host']}/api/v1`
  try {
    await authService.registerUser(req.body, baseUrl);
    return successResponse({
      res,
      message:'You have successfully registered with our platform. Please proceed to verify your email!',
      // data: {},
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};


export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await authService.loginUser(req.body);
    return successResponse({
      res,
      message:'You have successfully logged in',
      data,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};
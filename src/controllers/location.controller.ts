import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../utils/auth';
import { successResponse } from '../lib';
import { locationService } from '../services';



export const createLocation = async (req:AuthenticatedRequest, res: Response, next:NextFunction) => {
    try {
        const data = await locationService.createLocation(req.decodedToken.userId, req.body);
        return successResponse({
          res,
          message:'Drivers location successfully added to database',
          data,
          statusCode: 201,
        });
      } catch (error) {
        next(error);
      } 
}

export const getClosestLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await locationService.getClosestLocation(req.query);
    return successResponse({
      res,
      data: !data.length ? 'No cars closeby available':{
        "available_cars":data
      },
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};
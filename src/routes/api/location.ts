import express from 'express';
import { getClosestLocation, createLocation } from '../../controllers/location.controller';
import {verifyToken} from '../../utils/auth';

const locationRoutes = express.Router()

locationRoutes.get('/search', getClosestLocation);
locationRoutes.post('/', verifyToken as any, createLocation as any)

export default locationRoutes;
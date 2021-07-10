import express from 'express';
import { verifyUser } from '../../controllers/verification.controller';

const verificationRoutes = express.Router()

verificationRoutes.get('/', verifyUser);

export default verificationRoutes;
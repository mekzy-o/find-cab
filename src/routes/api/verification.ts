import express from 'express';
import { verifyUser, generateVerificationLink } from '../../controllers/verification.controller';

const verificationRoutes = express.Router()

verificationRoutes.get('/', verifyUser);
verificationRoutes.post('/', generateVerificationLink);
export default verificationRoutes;
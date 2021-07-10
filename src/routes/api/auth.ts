import express from 'express';
import { registerUser, loginUser } from '../../controllers/users.controller';

const authRoutes = express.Router()

authRoutes.post('/signup', registerUser)
authRoutes.post('/signin', loginUser)

export default authRoutes
import express from 'express';
import { updateUserStatus } from '../../controllers/users.controller';

const userRoutes = express.Router();

userRoutes.patch('/update', updateUserStatus)


export default userRoutes
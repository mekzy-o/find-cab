import { Router } from 'express';
import welcomeRoute from './welcome';
import usersRouter from './users';
import authRouter from './auth';
import verificationRouter from './verification';

const routes = Router()

routes.use('/', welcomeRoute)
routes.use('/users', usersRouter)
routes.use('/auth', authRouter)
routes.use('/verification', verificationRouter)

export default routes

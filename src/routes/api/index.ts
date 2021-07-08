import { Router } from 'express'

import welcomeRoute from './welcome.router'

const routes = Router()

routes.use('/', welcomeRoute)

export default routes

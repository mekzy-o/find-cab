import { Router, Request, Response } from 'express'

const welcomeRouter = Router()

welcomeRouter.get('/', (req: Request, res: Response) =>
  res.status(200).json({
    success: true,
    message: 'Welcome to FindCab  api'
  })
)

export default welcomeRouter

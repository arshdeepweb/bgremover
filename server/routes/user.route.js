import express from 'express'
import { clerkWebhooks, userAvailableCredits } from '../controllers/user.controller.js'
import authUserMiddleware from '../middlewares/auth.middleware.js'

const userRouter = express.Router()

userRouter.post('/webhooks', clerkWebhooks)
userRouter.get('/credit', authUserMiddleware, userAvailableCredits)

export default userRouter
import express from 'express'
import { clerkWebhooks, paymentRazorpay, userAvailableCredits, verifyRazorpay } from '../controllers/user.controller.js'
import authUserMiddleware from '../middlewares/auth.middleware.js'

const userRouter = express.Router()

userRouter.post('/webhooks', clerkWebhooks)
userRouter.get('/credit', authUserMiddleware, userAvailableCredits)
userRouter.post('/pay-razor', authUserMiddleware, paymentRazorpay);
userRouter.post('/verify-razor', verifyRazorpay);

export default userRouter
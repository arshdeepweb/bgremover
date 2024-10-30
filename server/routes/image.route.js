import express from 'express'
import upload from '../middlewares/multer.middleware.js'
import { removeBG } from '../controllers/image.controller.js'
import authUserMiddleware from '../middlewares/auth.middleware.js'


const imageRouter = express.Router()

imageRouter.post('/remove-bg', upload.single('image'), authUserMiddleware, removeBG)

export default imageRouter
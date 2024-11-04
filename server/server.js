import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import userRouter from './routes/user.route.js'
import imageRouter from './routes/image.route.js'


// App Config
const port = process.env.PORT || 4000
const app = express()

// Connect Database
await connectDB()

// Intialize middleware
app.use(express.json())
app.use(cors({
  origin: "https://bgeraser.vercel.app",
  optionsSuccessStatus: 200
}));

// API Routes

app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

app.get('/' ,(req, res)=>{
  res.send("API Working")
})

app.listen(port,()=>{
  console.log(`The server is running on http://localhost:${port}`)
})
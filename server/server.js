import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import userRouter from './routes/user.route.js'


// App Config
const port = process.env.PORT || 4000
const app = express()

// Connect Database
await connectDB()

// Intialize middleware
app.use(express.json())
app.use(cors())

// API Routes

app.use('/api/user', userRouter)

app.get('/' ,(req, res)=>{
  res.send("API Working")
})

app.listen(port,()=>{
  console.log(`The server is running on http://localhost:${port}`)
})
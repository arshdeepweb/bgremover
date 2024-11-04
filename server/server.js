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
  methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allowed headers
  credentials: true, // Enable cookies and credentials in cross-origin requests
  optionsSuccessStatus: 204, // Status for successful OPTIONS requests
}));

// API Routes

app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

app.get('/', (req, res) => {
  res.send("API Working")
})

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`)
})
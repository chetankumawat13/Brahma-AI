import express from 'express'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))




app.use('/api/auth',authRouter)

export default app
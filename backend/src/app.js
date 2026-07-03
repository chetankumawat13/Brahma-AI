import express from 'express'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import chatRouter from './routes/chat.routes.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL
}))




app.use('/api/auth',authRouter)
app.use('/api/chats',chatRouter)

export default app
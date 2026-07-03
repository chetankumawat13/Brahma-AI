import { Router } from "express";
import identifyUser from "../middlewares/auth.middleware.js";
import { getMe, getMessage, sendMessage, sendMessageStream } from "../controllers/chat.controller.js";

const chatRouter = Router()

chatRouter.post("/message",identifyUser,sendMessage)
chatRouter.post("/message/stream",identifyUser,sendMessageStream)


chatRouter.get('/',identifyUser,getMe)

chatRouter.get('/:chatId/messages',identifyUser,getMessage)

export default chatRouter
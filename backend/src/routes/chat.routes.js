import { Router } from "express";
import identifyUser from "../middlewares/auth.middleware.js";
import { getMe, getMessage, sendMessage } from "../controllers/chat.controller.js";

const chatRouter = Router()

chatRouter.post("/message",identifyUser,sendMessage)


chatRouter.get('/',identifyUser,getMe)

chatRouter.get('/:chatId/messages',identifyUser,getMessage)

export default chatRouter
import app from "./src/app.js";
import { createServer } from "http";
import {Server} from 'socket.io'
import connectToDB from "./src/config/database.js";
import dotenv from 'dotenv'
import { testAi } from "./src/services/ai.service.js";
dotenv.config()

const httpServer = createServer(app)

connectToDB()

testAi()

httpServer.listen(3000,() => {
    console.log("server is listen on port 3000");
})
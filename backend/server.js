import app from "./src/app.js";
import { createServer } from "http";
import {Server} from 'socket.io'
import connectToDB from "./src/config/database.js";
import dotenv from 'dotenv'
dotenv.config()

const httpServer = createServer(app)

connectToDB()


httpServer.listen(3000,() => {
    console.log("server is listen on port 3000");
})
import app from "./src/app.js";
import { createServer } from "http";
import connectToDB from "./src/config/database.js";
import http from 'http'
import dotenv from 'dotenv'
import { initSocket } from "./src/sockets/server.socket.js";
dotenv.config()
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const httpServer =  http.createServer(app)

initSocket(httpServer)

connectToDB()


httpServer.listen(3000,() => {
    console.log("server is listen on port 3000");
})
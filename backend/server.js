import app from "./src/app.js";
import { createServer } from "http";
import {Server} from 'socket.io'

const httpServer = createServer(app)


httpServer.listen(3000,() => {
    console.log("server is listen on port 3000");
})
import { Server, Socket } from "socket.io";


let io;

export function initSocket(httpServer){
    io  = new Server(httpServer,{
        cors:{
            origin:"https://brahmaai.onrender.com",
            credentials:true
        }
    })

    console.log("socket.io server is connected");

    io.on("connection", (socket) => {
        console.log("A user connected" + socket.id);
    })
}


export function getIO(){


    return io
}
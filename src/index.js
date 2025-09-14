import { Server } from "socket.io";
import http from "http";
import express from "express";
import roomHandler from "./handler/roomHandler.js";
import {PORT} from "./config/server.js"

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // frontend origin
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    roomHandler(io,socket);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    }
    );
});

server.listen(PORT, () => {
  console.log("Server running on port 5000");
});

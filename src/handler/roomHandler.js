import {v4 as uuid} from "uuid";
const roomHandler = (io,socket)=>{
    const createRoom = ()=>{
        const roomId = uuid();
        socket.join(roomId);
        socket.emit("room-Created",{roomId});
        console.log("Room created with ID:", roomId);
    }

    const joinRoom = ()=>{
        console.log("Joining room");
    }

    socket.on("create-Room",createRoom);
    socket.on("join-Room",joinRoom);
}

export default roomHandler;
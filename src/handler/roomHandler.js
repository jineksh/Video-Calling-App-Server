import {v4 as uuid} from "uuid";

const rooms = {};
const roomHandler = (io,socket)=>{

    

    const createRoom = ()=>{
        const roomId = uuid();
        //socket.join(roomId);
        socket.emit("room-Created",{roomId});
        console.log("Room created with ID:", roomId);
        rooms[roomId] = [];
    }

    const joinRoom = ({roomID,peerID})=>{
        if(rooms[roomID]){
            rooms[roomID].push(peerID);
            console.log(`${peerID} is joining room: ${roomID}`);
            socket.join(roomID);
            console.log(rooms);
            socket.on('ready',()=>{
                socket.to(roomID).emit('user-Joined',{peerID});
            })
        }
        
    }

    socket.on("create-Room",createRoom);
    socket.on("join-Room",joinRoom);
}

export default roomHandler;
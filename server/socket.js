import { Server as SocketIoServer } from "socket.io";
import Message from "./models/messageModel.js";

const setupSocket = (server) => {
    const io = new SocketIoServer(server, {
        cors: {
            origin: [process.env.ORIGIN, 'http://localhost:5173'], // frontend link
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    // map
    const userSocketMap = new Map();


    // disconnect
    const disconnect = (socket) => {
        console.log(`Client Disconnected: ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId == socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    };


    // send Message
    const sendMessage = async (message) => {
        console.log("Actual message = ", message)
        // example of message
        // Actual message = {
        //     sender: '669a8069e06cf14ab5281b0b',
        //     recipient: '669a80cfe06cf14ab5281b12',
        //     content: 'ho gg',
        //     messageType: 'text'
        // }


        const senderSocketId = userSocketMap.get(message.sender)
        const recipientSocketId = userSocketMap.get(message.recipient)

        const createMessage = await Message.create(message)
        const messageData = await Message.findById(createMessage._id)
            .populate("sender", "id email firstName lastName image color")
            .populate("recipient", "id email firstName lastName image color")

        if (senderSocketId) {
            console.log(`Message: ${message} is sending to userId : ${message.recipient} `)
            io.to(senderSocketId).emit('receivedMessage', messageData)
        }
        if (recipientSocketId) {
            console.log("message has received")
            io.to(recipientSocketId).emit('receivedMessage', messageData)
        }

    }


    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;
        if (userId) {
            userSocketMap.set(userId, socket.id);
            console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
        } else {
            console.log("User ID not provided during connection.");
        }

        socket.on("disconnect", () => disconnect(socket));
        socket.on("sendMessage", sendMessage)
    });
};

export default setupSocket;

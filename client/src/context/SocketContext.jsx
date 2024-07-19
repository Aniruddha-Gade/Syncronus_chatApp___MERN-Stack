import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const socket = useRef();
    const { userInfo } = useAppStore();

    useEffect(() => {
        if (userInfo) {
            socket.current = io(HOST, {
                withCredentials: true,
                query: { userId: userInfo._id }
            });

            socket.current.on("connect", () => {
                console.log("Connected to socket server");
                // console.log("socket = ", socket)
            });


            // handle Received-Message
            const handleReceivedMessage = (message) => {
                console.log("received message from socket = ", message)
                const { selectedChatData, selectedChatType, addMessage } = useAppStore.getState()

                if (selectedChatType !== undefined &&
                    (selectedChatData._id === message.sender._id
                        || selectedChatData._id === message.recipient._id)
                ) {
                    addMessage(message)
                }

            }

            // received message from socket
            socket.current.on("receivedMessage", handleReceivedMessage)

            return () => {
                socket.current.disconnect();
            };
        }


    }, [userInfo]);

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    );
};
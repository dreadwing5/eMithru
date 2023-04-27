// hooks/useSocket.js
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const useSocket = (onReceiveMessage) => {
  const socket = useRef();
  useEffect(() => {
    socket.current = io(SOCKET_URL);
    socket.current.on("getMessage", onReceiveMessage);

    return () => {
      socket.current.disconnect();
    };
  }, [onReceiveMessage]);

  const sendMessage = (message, roomId) => {
    socket.current.emit("sendMessage", {
      ...message,
      room: roomId,
    });
  };

  const joinRoom = (roomId) => {
    socket.current.emit("join_room", roomId);
  };

  const leaveRoom = (roomId) => {
    socket.current.emit("leave_room", roomId);
  };

  return { sendMessage, joinRoom, leaveRoom };
};

export default useSocket;

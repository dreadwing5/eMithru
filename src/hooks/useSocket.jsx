// hooks/useSocket.js
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const useSocket = (threadId, userId, setMessages) => {
  const socket = useRef();

  useEffect(() => {
    socket.current = io(SOCKET_URL, {
      query: {
        userId,
      },
    });

    return () => {
      socket.current.disconnect();
    };
  }, [threadId, userId]);

  useEffect(() => {
    socket.current.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, []);

  const sendMessage = (message, roomId) => {
    socket.current.emit("sendMessage", {
      ...message,
      roomId,
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

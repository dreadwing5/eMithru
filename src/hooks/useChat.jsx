import { useState, useEffect, useRef, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL, SOCKET_URL } from "../config";
import ChatContext from "../context/ChatContext";
// import { AuthContext } from "../context/AuthContext";

import api from "../utils/axios";

export default function ChatProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();

  const { user } = useContext(AuthContext);
  console.log(user);
  // const user._id = "6440840795719c38cc99d814";

  useEffect(() => {
    socket.current = io(SOCKET_URL);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.sender,
        body: data.body,
        sendTime: Date.now(),
      });
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  const joinChat = async (chat) => {
    console.log("Joining room....");
    setCurrentChat(chat);
    if (!chat) return;
    console.log(chat);
    try {
      const response = await api.get(`/messages/${chat._id}/?type=private`);
      const { data } = response.data;
      setMessages(data.messages);
      socket.current.emit("join_room", chat.conversationId);
    } catch (err) {
      console.log(err);
    }
  };

  const leaveChat = (chat) => {
    if (!chat) return;

    socket.current.emit("leave_room", chat.conversationId);
  };

  const sendMessage = async (newMessage) => {
    const message = {
      senderId: user._id,
      body: newMessage,
    };
    socket.current.emit("sendMessage", {
      sender: user._id,
      body: newMessage,
      room: currentChat._id,
    });

    try {
      const response = await api.post(
        `/messages/${currentChat._id}?type=private`,
        message
      );
      const { data } = response.data;
      setMessages([...messages, data.message]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        currentChat,
        messages,
        joinChat,
        leaveChat,
        sendMessage,
        setConversations,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

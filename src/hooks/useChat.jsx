import { useState, useEffect, useRef, useContext } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL, SOCKET_URL } from "../config";
import ChatContext from "../context/ChatContext";

export default function ChatProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();

  const {
    user: {
      data: { user: userInfo },
    },
  } = useContext(AuthContext);

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

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/conversations/`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getConversations();
  }, []);

  const joinChat = async (chat) => {
    setCurrentChat(chat);
    if (!chat) return;

    try {
      const res = await axios.get(
        `${BASE_URL}/messages/${chat.conversationId}`
      );
      setMessages(res.data);
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
      senderId: userInfo._id,
      body: newMessage,
      conversationId: currentChat.conversationId,
    };
    socket.current.emit("sendMessage", {
      sender: userInfo._id,
      body: newMessage,
      room: currentChat.conversationId,
    });

    try {
      const res = await axios.post(`${BASE_URL}/messages`, message);
      setMessages([...messages, res.data]);
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

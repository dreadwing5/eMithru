import { io } from "socket.io-client";
import axios from "axios";
import { Box, Stack, Drawer, IconButton, Divider } from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";

import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import { BASE_URL, SOCKET_URL } from "../../config";

import Conversation from "../conversation";
import Scrollbar from "../Scrollbar";
const SIDEBAR_WIDTH = 320;
const SIDEBAR_COLLAPSE_WIDTH = 96;

export default function ChatSidebar() {
  const theme = useTheme();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();

  const {
    user: {
      data: { user: userInfo },
    },
  } = useContext(AuthContext);
  const scrollRef = useRef();
  useEffect(() => {
    socket.current = io(SOCKET_URL);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.sender,
        body: data.body,
        sendTime: Date.now(),
      });
    });
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

  useEffect(() => {
    const getMessages = async () => {
      console.log(currentChat);
      try {
        const res = await axios.get(
          `${BASE_URL}/messages/${currentChat?.conversationId}`
        );
        setMessages(res.data);
        currentChat &&
          socket.current.emit("join_room", currentChat.conversationId);
      } catch (err) {
        console.log(err);
      }
    };
    currentChat && getMessages();
    return () => {
      socket.current.emit("leave_room", currentChat?.conversationId);
    };
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={{ py: 2, px: 3 }}>
      <Stack direction="column" alignItems="center" justifyContent="center">
        <Scrollbar>
          {conversations.map((c, i) => (
            <Box
              key={i}
              sx={{
                cursor: "pointer",
              }}
              onClick={() => setCurrentChat(c)}
            >
              <Conversation conversation={c} />
            </Box>
          ))}
        </Scrollbar>
      </Stack>
    </Box>
  );
}

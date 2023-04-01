import { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
// @mui
import { Box, Divider, Stack } from "@mui/material";
// redux
import ChatMessageList from "./ChatMessageList";
import ChatMessageInput from "./ChatMessageInput";

// ----------------------------------------------------------------------

const conversation = {
  id: 1,
  participants: [
    { id: "8864c717-587d-472a-929a-8e5f298024da-0", name: "Me", avatar: null },
    {
      id: "8864c717-587d-472a-929a-8e5f298024da-1",
      name: "Alice",
      avatar: "https://via.placeholder.com/150",
    },
  ],
  messages: [
    {
      id: "8864c717-587d-472a-929a-8e5f298024da-1",
      senderId: "8864c717-587d-472a-929a-8e5f298024da-0",
      body: "Hey Alice, how are you?",
      createdAt: "2022-03-31T09:30:00.000Z",
    },
    {
      id: "8864c717-587d-472a-929a-8e5f298024da-2",
      senderId: "8864c717-587d-472a-929a-8e5f298024da-1",
      body: "Hey, I'm good thanks. How about you?",
      createdAt: "2022-03-31T09:31:00.000Z",
    },
    {
      id: "8864c717-587d-472a-929a-8e5f298024da-3",
      senderId: "8864c717-587d-472a-929a-8e5f298024da-0",
      body: "I'm doing pretty well too, thanks!",
      createdAt: "2022-03-31T09:32:00.000Z",
    },
  ],
};

const activeConversationId = "123";
const handleSendMessage = (message) => {
  console.log(`Sending message: ${message}`);
};

export default function ChatWindow() {
  return (
    <Stack sx={{ flexGrow: 1, minWidth: "1px" }}>
      <Divider />
      <Box sx={{ flexGrow: 1, display: "flex", overflow: "hidden" }}>
        <Stack sx={{ flexGrow: 1 }}>
          <ChatMessageList conversation={conversation} />
          <Divider />
          <ChatMessageInput
            conversationId={activeConversationId}
            onSend={handleSendMessage}
          />
        </Stack>
      </Box>
    </Stack>
  );
}

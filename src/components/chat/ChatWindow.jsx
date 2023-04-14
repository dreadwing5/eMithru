import { useContext, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Box, Divider, Stack } from "@mui/material";
import ChatMessageList from "./ChatMessageList";
import ChatMessageInput from "./ChatMessageInput";
import ChatContext from "../../context/ChatContext";

export default function ChatWindow() {
  const { currentChat, messages, sendMessage } = useContext(ChatContext);

  return (
    <Stack sx={{ flexGrow: 1, minWidth: "1px" }}>
      <Box
        sx={{ flexGrow: 1, display: "flex", overflow: "hidden", minWidth: "0" }}
      >
        <Stack sx={{ flexGrow: 1, flexShrink: 0 }}>
          {currentChat && (
            <>
              <ChatMessageList conversation={currentChat} messages={messages} />
              <Divider />
              <ChatMessageInput onSend={sendMessage} />
            </>
          )}
        </Stack>
      </Box>
    </Stack>
  );
}

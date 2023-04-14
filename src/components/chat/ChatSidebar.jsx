import { Box, Stack, Drawer, IconButton, Divider } from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";

import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import Conversation from "./Conversation";
import Scrollbar from "../Scrollbar";
import ChatContext from "../../context/ChatContext";

const SIDEBAR_WIDTH = 320;
const SIDEBAR_COLLAPSE_WIDTH = 96;

export default function ChatSidebar() {
  const theme = useTheme();
  const { conversations, currentChat, joinChat, leaveChat } =
    useContext(ChatContext);

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
              onClick={() => {
                if (currentChat?.conversationId === c.conversationId) {
                  leaveChat(currentChat);
                  joinChat(null);
                } else {
                  joinChat(c);
                }
              }}
            >
              <Conversation conversation={c} />
            </Box>
          ))}
        </Scrollbar>
      </Stack>
    </Box>
  );
}

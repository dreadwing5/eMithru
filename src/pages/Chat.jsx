import { useEffect } from "react";
// @mui
import { Card, Container, Divider } from "@mui/material";
import ChatProvider from "../hooks/useChat";
// redux

// components
import Page from "../components/Page";

import ChatWindow from "../components/chat/ChatWindow";
import ChatSidebar from "../components/chat/ChatSidebar";

// ----------------------------------------------------------------------

export default function Chat() {
  return (
    <Page title="Chat">
      <Container maxWidth="xl" sx={{ overflowX: "hidden", overflowY: "auto" }}>
        <Card sx={{ height: "90vh", display: "flex", flexShrink: 0 }}>
          <ChatProvider>
            <ChatSidebar />
            <Divider orientation="vertical" />
            <ChatWindow />
          </ChatProvider>
        </Card>
      </Container>
    </Page>
  );
}

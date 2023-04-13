import { useEffect } from "react";
// @mui
import { Card, Container, Divider } from "@mui/material";
// redux

// components
import Page from "../Page";

import ChatWindow from "./ChatWindow";
import ChatSidebar from "./ChatSidebar";

// ----------------------------------------------------------------------

export default function Chat() {
  return (
    // <Page title="Chat">
    <Container maxWidth="xl" sx={{ overflowX: "hidden", overflowY: "auto" }}>
      <Card sx={{ height: "90vh", display: "flex", flexShrink: 0 }}>
        <ChatSidebar />
        <Divider orientation="vertical" />
        <ChatWindow />
      </Card>
    </Container>
    // </Page>
  );
}

import { useEffect } from "react";
// @mui
import { Card, Container } from "@mui/material";
// redux

// components
import Page from "../Page";

import ChatWindow from "./ChatWindow";

// ----------------------------------------------------------------------

export default function Chat() {
  return (
    // <Page title="Chat">
    <Container maxWidth="xl">
      <Card sx={{ height: "72vh", display: "flex" }}>
        {/* <ChatSidebar /> */}
        <ChatWindow />
      </Card>
    </Container>
    // </Page>
  );
}

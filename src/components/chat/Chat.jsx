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
    <Container maxWidth="lg">
      <Card sx={{ height: "90vh", display: "flex" }}>
        {/* <ChatSidebar /> */}
        <ChatWindow />
      </Card>
    </Container>
    // </Page>
  );
}

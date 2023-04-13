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
    <Container maxWidth="xl" sx={{ overflowX: "hidden", overflowY: "auto" }}>
      <Card sx={{ height: "90vh", display: "flex", flexShrink: 0 }}>
        <ChatWindow />
      </Card>
    </Container>
    // </Page>
  );
}

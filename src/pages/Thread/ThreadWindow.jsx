import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Divider,
  Stack,
  Typography,
  CircularProgress,
  Container,
  Card,
  Avatar,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import { AuthContext } from "../../context/AuthContext";

import Page from "../../components/Page";

import api from "../../utils/axios";

import { MessageList, MessageInput } from "./Message/Message";

import useSocket from "../../hooks/useSocket";

const ThreadHeader = ({ thread }) => {
  const statusColors = {
    open: "#4caf50",
    "In Progress": "#ff9800",
    closed: "#f44336",
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          {thread.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: "bold",
              color: "text.secondary",
              mr: 1,
            }}
          >
            Tag:
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: "bold",
              mr: 2,
            }}
          >
            #{thread.tag}
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: statusColors[thread.status],
              borderRadius: "12px",
              padding: "0 8px",
              color: "white",
              fontWeight: "bold",
              mr: 2,
            }}
          >
            Status: {thread.status}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {thread.participants.slice(0, 3).map((participant, idx) => (
          <Tooltip key={idx} title={participant.name} placement="top">
            <Avatar
              sx={{
                ml: idx === 0 ? 0 : -1,
                zIndex: idx === 0 ? 3 : 2 - idx,
                width: 36,
                height: 36,
                position: "relative",
              }}
              alt={participant.name}
            >
              {/* TODO : Conditional based on the online status */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 10,
                  right: 8,
                  transform: "translate(50%, 50%)", // center the icon on the right and bottom
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  border: `1px solid ${"success.main"}`,
                  backgroundColor: "success.main",
                }}
              />
              {participant.name[0]}
            </Avatar>
          </Tooltip>
        ))}
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {thread.status === "open" && (
            <MenuItem onClick={handleClose}>Mark as closed</MenuItem>
          )}
        </Menu>
      </Box>
    </Box>
  );
};

export default function ThreadWindow() {
  const [isLoading, setIsLoading] = useState(false);
  const [thread, setThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  const { threadId } = useParams();
  const { sendMessage, joinRoom, leaveRoom } = useSocket(
    threadId,
    user._id,
    setMessages
  );

  useEffect(() => {
    joinRoom(threadId);
    return () => {
      leaveRoom(threadId);
    };
  }, [threadId]);

  const fetchThread = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/threads/${threadId}`);
      if (response.status === 200) {
        const { data } = response.data;
        setThread(data.thread);
        setMessages(data.thread.messages);
        console.log("THREAD ", data.thread);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchThread();
  }, [threadId]);

  const handleSendMessage = async (newMessage) => {
    const message = {
      senderId: user._id,
      body: newMessage,
    };
    try {
      const response = await api.post(`/threads/${threadId}/messages`, message);
      const { data } = response.data;
      sendMessage(data.message, threadId); // FIXME : Socket is not working
    } catch (err) {
      console.log(err);
    }
  };

  //FIXME : ThreadHeader should be displayed when the thread has loaded

  /* 
  TODO:
  Add a placeholder messages when there are no messages to display
*/
  return (
    <Page title="Thread">
      <Container maxWidth="xl" sx={{ overflowX: "hidden", overflowY: "auto" }}>
        <Card sx={{ height: "90vh", display: "flex", flexShrink: 0 }}>
          {/* <ChatProvider> */}
          <Stack sx={{ flexGrow: 1, minWidth: "1px" }}>
            <Box
              sx={{
                p: 2,
              }}
            >
              {thread && <ThreadHeader thread={thread} />}
            </Box>
            <Divider />

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                overflow: "hidden",
                minWidth: "0",
              }}
            >
              {isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    flexGrow: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <Stack sx={{ flexGrow: 1, flexShrink: 0 }}>
                    {thread && (
                      <>
                        <MessageList
                          conversation={thread}
                          messages={messages}
                        />

                        <Divider />

                        <MessageInput
                          disabled={!thread}
                          onSend={handleSendMessage}
                        />
                      </>
                    )}
                  </Stack>
                </>
              )}
            </Box>
          </Stack>
          {/* </ChatProvider> */}
        </Card>
      </Container>
    </Page>
  );
}

import React, { useState } from "react";
import {
  Box,
  Stack,
  Paper,
  TextField,
  Typography,
  IconButton,
  Card,
  Container,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { deepOrange } from "@mui/material/colors";
import AssistantIcon from "@mui/icons-material/Assistant";
import PersonIcon from "@mui/icons-material/Person";

const mockMessages = [
  {
    body: "Hello! I'm your Campus Buddy. How can I help you today?",
    sender: "ai",
  },
  {
    body: "What's the schedule for today's classes?",
    sender: "user",
  },
  {
    body: "Today's classes are: Math at 9 am, History at 11 am, and Chemistry at 2 pm.",
    sender: "ai",
  },
  {
    body: "When is the next Physics exam?",
    sender: "user",
  },
  {
    body: "The next Physics exam is scheduled for May 10th at 10 am.",
    sender: "ai",
  },
];

const CampusBuddyHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mt: 2,
        mb: 1,
        ml: 5,
        height: "5vh",
        width: "100%",
      }}
    >
      <Avatar
        sx={{ bgcolor: deepOrange[500], mr: 2 }}
        variant="rounded"
        size="large"
      >
        <AssistantIcon fontSize="large" />
      </Avatar>
      <Box>
        <Typography variant="h6" sx={{ mb: 0 }}>
          Campus Buddy
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 0 }}>
          Your Personal AI Assistant
        </Typography>
      </Box>
    </Box>
  );
};

const CampusBuddy = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [messageInput, setMessageInput] = useState("");

  const handleMessageInput = (e) => {
    setMessageInput(e.target.value);
  };

  const handleSendMessage = () => {
    console.log(messageInput);
    if (messageInput.trim().length > 0) {
      setMessages([...messages, { body: messageInput, sender: "user" }]);
      setMessageInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CampusBuddyHeader />
      <Container maxWidth="xl" sx={{ overflowX: "hidden", overflowY: "auto" }}>
        <Card sx={{ height: "80vh", display: "flex", flexShrink: 0, m: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                display: "flex",
                p: 5,
                flexDirection: "column",
              }}
            >
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
            </Box>
            <Box sx={{ p: 3 }}>
              <ChatMessageInput
                messageInput={messageInput}
                setMessageInput={setMessageInput}
                handleSendMessage={handleSendMessage}
                handleKeyPress={handleKeyPress}
              />
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

const ChatMessage = ({ message }) => {
  const isUserMessage = message.sender === "user";
  const justifyContent = isUserMessage ? "flex-end" : "flex-start";

  return (
    <Box
      sx={{
        mb: 2,
        display: "flex",
        justifyContent: justifyContent,
      }}
    >
      <Paper
        sx={{
          p: 2,
          bgcolor: isUserMessage ? "primary.main" : "grey.200",
          color: isUserMessage ? "common.white" : "common.black",
          borderRadius: "10px",
          maxWidth: "fit-content",
          display: "flex",
          alignItems: "center",
        }}
      >
        {isUserMessage ? (
          <Avatar sx={{ mr: 1 }}>
            <PersonIcon />
          </Avatar>
        ) : (
          <Avatar sx={{ mr: 1 }} style={{ backgroundColor: deepOrange[500] }}>
            <AssistantIcon />
          </Avatar>
        )}
        <Typography>{message.body}</Typography>
      </Paper>
    </Box>
  );
};

const ChatMessageInput = ({
  handleSendMessage,
  handleKeyPress,
  messageInput,
  setMessageInput,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const handleInput = (e) => {
    const { value } = e.target;
    setMessageInput(value);
    if (value.trim().length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <Stack direction="row" spacing={1} alignItems="flex-end">
      <TextField
        fullWidth
        value={messageInput}
        onChange={handleInput}
        onKeyPress={handleKeyPress}
        variant="outlined"
        placeholder="Type a message"
        InputProps={{
          endAdornment: (
            <IconButton
              color="primary"
              disabled={isDisabled}
              onClick={handleSendMessage}
            >
              <SendIcon />
            </IconButton>
          ),
        }}
      />
    </Stack>
  );
};

export default CampusBuddy;

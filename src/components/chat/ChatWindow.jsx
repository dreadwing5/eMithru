import { useContext, useEffect, useState } from "react";
import {
  Box,
  Divider,
  Stack,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import ChatMessageList from "./ChatMessageList";
import ChatMessageInput from "./ChatMessageInput";
import ChatContext from "../../context/ChatContext";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function ChatWindow() {
  const { currentChat, messages, sendMessage } = useContext(ChatContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const sender = currentChat?.participants.find(
    (participant) => participant._id !== "6440827f7b7d9337a2202d16"
  );

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (messages.length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [messages]);

  return (
    <Stack sx={{ flexGrow: 1, minWidth: "1px" }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ ml: 2, display: "flex", flexDirection: "row" }}>
          <Avatar
            alt={sender?.name}
            sx={{
              bgcolor: "primary.main",
              mr: 2,
              ...(sender?.isOnline && {
                "&:after": {
                  content: '""',
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "success.main",
                },
              }),
            }}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {sender?.name}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                mt: 0.5,
                opacity: 0.6, // Added opacity
                fontWeight: 300, // Added fontWeight
              }}
            >
              {sender?.isOnline ? "Online" : "Offline"}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PhoneIcon sx={{ cursor: "pointer" }} />
          <VideocamIcon sx={{ cursor: "pointer" }} />
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Test 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>Test 2</MenuItem>
          </Menu>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{ flexGrow: 1, display: "flex", overflow: "hidden", minWidth: "0" }}
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
          <Stack sx={{ flexGrow: 1, flexShrink: 0 }}>
            {currentChat && (
              <>
                <ChatMessageList
                  conversation={currentChat}
                  messages={messages}
                />
                <Divider />
                <ChatMessageInput onSend={sendMessage} />
              </>
            )}
          </Stack>
        )}
      </Box>
    </Stack>
  );
}

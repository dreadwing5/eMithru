import React, { useEffect, useState, useRef } from "react";
import { styled } from "@mui/system";
import { formatDistanceToNowStrict } from "date-fns";
import { Box, Avatar, Typography } from "@mui/material";
import { Stack, Input, Divider, IconButton } from "@mui/material";

import Iconify from "../../../components/Iconify";
import Scrollbar from "../../../components/Scrollbar";

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 380,
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[500_12],
  color: theme.palette.text.primary,
}));

const MessageItem = ({ message, conversation }) => {
  const RootStyle = styled("div")(({ theme }) => ({
    marginBottom: theme.spacing(3),
  }));
  //FIXME : Remove the hardcoded value
  const currentUserId = "6440827f7b7d9337a2202d16";

  const sender = conversation.participants.find(
    (participant) => participant._id === message.senderId
  );

  const isMe = message.senderId === currentUserId;
  const justifyContent = isMe ? "flex-end" : "flex-start";

  const firstName = sender?.name && sender.name.split(" ")[0];

  return (
    <RootStyle>
      <Box
        sx={{
          display: "flex",
          justifyContent,
        }}
      >
        {!isMe && (
          <Avatar
            alt={sender?.name}
            src={sender?.avatar}
            sx={{ width: 32, height: 32, mr: 2 }}
          />
        )}

        <div>
          <ContentStyle
            sx={{
              ...(isMe && { color: "grey.800", bgcolor: "primary.lighter" }),
            }}
          >
            <Typography variant="body2">{message.body}</Typography>
          </ContentStyle>
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              textAlign: isMe ? "right" : "left",
            }}
          >
            {!isMe && `${firstName}, `}
            {formatDistanceToNowStrict(new Date(message.createdAt), {
              addSuffix: true,
            })}
          </Typography>
        </div>
      </Box>
    </RootStyle>
  );
};

export function MessageList({ conversation, messages }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToBottom();
    }
  }, [conversation.messages]);

  return (
    <>
      <Scrollbar sx={{ p: 3 }} ref={scrollRef}>
        {messages.map((message) => (
          <MessageItem
            key={message._id}
            message={message}
            conversation={conversation}
          />
        ))}
      </Scrollbar>
    </>
  );
}

const RootStyle = styled("div")(({ theme }) => ({
  minHeight: 56,
  display: "flex",
  position: "relative",
  alignItems: "center",
  paddingLeft: theme.spacing(2),
}));

export function MessageInput({ disabled, conversationId, onSend }) {
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message) {
      return "";
    }
    onSend(message);

    // sendMessage(message);
    setMessage("");
  };

  return (
    <RootStyle>
      <Input
        disabled={disabled}
        fullWidth
        value={message}
        disableUnderline
        onKeyUp={handleKeyUp}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Type a message"
        endAdornment={
          <Stack direction="row" spacing={1} sx={{ flexShrink: 0, mr: 1.5 }}>
            <IconButton disabled={disabled} size="small" onClick={handleAttach}>
              <Iconify
                icon="ic:round-add-photo-alternate"
                width={22}
                height={22}
              />
            </IconButton>
            <IconButton disabled={disabled} size="small" onClick={handleAttach}>
              <Iconify icon="eva:attach-2-fill" width={22} height={22} />
            </IconButton>
            <IconButton disabled={disabled} size="small">
              <Iconify icon="eva:mic-fill" width={22} height={22} />
            </IconButton>
          </Stack>
        }
      />

      <Divider orientation="vertical" flexItem />

      <IconButton
        color="primary"
        disabled={!message}
        onClick={handleSend}
        sx={{ mx: 1 }}
      >
        <Iconify icon="ic:round-send" width={22} height={22} />
      </IconButton>

      <input type="file" ref={fileInputRef} style={{ display: "none" }} />
    </RootStyle>
  );
}

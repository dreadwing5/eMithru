import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { formatDistanceToNowStrict } from "date-fns";

const RootStyle = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 380,
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[500_12],
  color: theme.palette.text.primary,
}));

export default function ChatMessageItem({ message, conversation }) {
  const currentUserId = "6440840795719c38cc99d814";
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
            alt={sender.name}
            src={sender.avatar}
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
}

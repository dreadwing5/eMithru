import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Avatar,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  useTheme,
} from "@mui/material";

ChatConversationItem.propTypes = {
  conversation: PropTypes.object.isRequired,
  onSelectConversation: PropTypes.func,
  isSelected: PropTypes.bool.isRequired,
};

export default function ChatConversationItem({
  conversation,
  onSelectConversation,
  isSelected,
}) {
  const theme = useTheme();
  const navButtonBackgroundColor =
    theme.palette.mode === "dark" ? "#37404a" : "#e9eaeb";
  const currentUserId = "6440827f7b7d9337a2202d16";

  const otherParticipant = conversation.participants.find(
    (participant) => participant._id !== currentUserId
  );

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 3,
        transition: "all",
        backgroundColor: isSelected ? navButtonBackgroundColor : "transparent",
        "&:hover": {
          backgroundColor: navButtonBackgroundColor,
        },
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        textAlign: "left",
      }}
      onClick={onSelectConversation}
    >
      <ListItemAvatar>
        <Avatar alt={otherParticipant.name} />
      </ListItemAvatar>

      <ListItemText
        primary={otherParticipant.name}
        primaryTypographyProps={{ noWrap: true, variant: "subtitle2" }}
      />
    </ListItemButton>
  );
}

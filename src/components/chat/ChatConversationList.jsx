import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { useState, useContext, useEffect } from "react";

import ChatContext from "../../context/ChatContext";
// @mui
import { List } from "@mui/material";

import ChatConversationItem from "./ChatConversationItem";

// ----------------------------------------------------------------------

ChatConversationList.propTypes = {
  conversations: PropTypes.arrayOf(PropTypes.object),
  isOpenSidebar: PropTypes.bool,
  activeConversationId: PropTypes.string,
  sx: PropTypes.object,
};

export default function ChatConversationList({
  conversations,
  isOpenSidebar,
  activeConversationId,
  sx,
  ...other
}) {
  const navigate = useNavigate();
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  const { joinChat } = useContext(ChatContext);

  useEffect(() => {
    if (conversations.length > 0) {
      const firstConversation = conversations[0];
      setSelectedConversationId(firstConversation._id);
      joinChat(firstConversation);
    }
  }, [conversations]);

  const handleSelectConversation = (conversation) => {
    let conversationKey = "";
    if (conversation.type === "group") {
      conversationKey = conversation._id;
    } else {
      const otherParticipant = conversation.participants.find(
        (participant) => participant._id !== "6440827f7b7d9337a2202d16"
      );
      if (otherParticipant) {
        conversationKey = otherParticipant._id;
      }
    }
    setSelectedConversationId(conversation._id);
    // if (currentChat?.conversationId === conversation.conversationId) {
    //   leaveChat(currentChat);
    //   joinChat(null);
    // } else {
    joinChat(conversation);
    // }
    // navigate(PATH_DASHBOARD.chat.view(conversationKey));
    console.log("Conversation was clicked");
  };

  const loading = !conversations.length;

  return (
    <List disablePadding sx={sx} {...other}>
      {(loading ? [...Array(12)] : conversations).map((conversation, index) => (
        <ChatConversationItem
          key={conversation._id}
          isOpenSidebar={isOpenSidebar}
          conversation={conversation}
          isSelected={selectedConversationId === conversation._id}
          onSelectConversation={() => handleSelectConversation(conversation)}
        />
      ))}
    </List>
  );
}

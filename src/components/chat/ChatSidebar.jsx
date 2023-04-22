import React, { useContext, useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Scrollbar from "../Scrollbar";
import ChatConversationList from "./ChatConversationList";
import ChatContext from "../../context/ChatContext";
import api from "../../utils/axios";

import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

const ChatSearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      size="small"
      fullWidth
      sx={{ width: "100%", textAlign: "right" }}
      value={searchValue}
      onChange={handleSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default function ChatSidebar() {
  const theme = useTheme();
  const { conversations, currentChat, joinChat, leaveChat, setConversations } =
    useContext(ChatContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredConversations, setFilteredConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const { data } = await api.get("/private-conversations/");
        const { conversations } = data.data;
        console.log(conversations);
        setConversations(conversations);
      } catch (err) {
        console.log(err);
      }
    };

    getConversations();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const filtered = conversations.filter((conversation) =>
      conversation.participants.some(
        (participant) =>
          participant.name
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase()) &&
          participant.id !== "8864c717-587d-472a-929a-8e5f298024da-0"
      )
    );
    setFilteredConversations(filtered);
  }, [conversations, searchTerm]);

  return (
    <Box sx={{ py: 2, px: 3 }}>
      <Stack direction="column">
        <Box sx={{ width: "100%", mt: 2, mb: 2 }}>
          <ChatSearchBar />
        </Box>
        <Scrollbar>
          {searchTerm.length > 0 && filteredConversations.length > 0 && (
            <ChatConversationList
              conversations={filteredConversations}
              activeConversationId={currentChat?.conversationId}
              isOpenSidebar={true}
            />
          )}
          {searchTerm.length === 0 && conversations.length > 0 && (
            <ChatConversationList
              conversations={conversations}
              activeConversationId={currentChat?.conversationId}
              isOpenSidebar={true}
            />
          )}
        </Scrollbar>
      </Stack>
    </Box>
  );
}

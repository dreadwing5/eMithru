import React from "react";
import { Menu, MenuItem } from "@mui/material";

const MentorSuggestionMenu = ({
  anchorEl,
  open,
  onClose,
  suggestions,
  onMentorSelect,
}) => {
  return (
    <Menu
      id="mentor-suggestion-menu"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={onClose}
    >
      {suggestions.map((mentor) => (
        <MenuItem
          key={mentor.id}
          onClick={() => {
            onMentorSelect(mentor.name);
            onClose();
          }}
        >
          {mentor.name}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default MentorSuggestionMenu;

import React, { useMemo } from "react";
import { Menu, MenuItem } from "@mui/material";

const MentorSuggestionMenu = ({
  anchorEl,
  open,
  onClose,
  suggestions,
  onMentorSelect,
}) => {
  const menuItems = useMemo(() => {
    return suggestions.map((mentor) => (
      <MenuItem
        key={mentor.id}
        onClick={() => {
          onMentorSelect(mentor);
          onClose();
        }}
      >
        {mentor.name}
      </MenuItem>
    ));
  }, [suggestions, onMentorSelect, onClose]);

  return (
    <Menu
      id="mentor-suggestion-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
    >
      {menuItems}
    </Menu>
  );
};

export default MentorSuggestionMenu;

import React from "react";
import { IconButton, Collapse } from "@mui/material";
import { ArrowDropDown, ArrowRight } from "@mui/icons-material";

const CollapsibleIcon = ({ isOpen, onClick }) => {
  return (
    <IconButton
      edge="end"
      size="small"
      onClick={onClick}
      sx={{
        ml: "auto",
        color: "inherit",
      }}
    >
      {isOpen ? <ArrowDropDown /> : <ArrowRight />}
    </IconButton>
  );
};

export default CollapsibleIcon;

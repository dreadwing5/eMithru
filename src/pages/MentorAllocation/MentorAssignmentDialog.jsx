import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from "@mui/material";

import MentorSuggestionMenu from "./MentorSuggestionMenu";

const mockMentors = [
  { id: "1", name: "Dr. Jane Doe" },
  { id: "2", name: "Dr. John Smith" },
  { id: "3", name: "Dr. Sarah Johnson" },
  { id: "4", name: "Dr. Bob Johnson" },
  { id: "5", name: "Dr. Tom Green" },
  { id: "6", name: "Dr. Alice Brown" },
  { id: "7", name: "Prof. Albus Dumbledore" },
  { id: "8", name: "Prof. Minerva McGonagall" },
  { id: "9", name: "Prof. Remus Lupin" },
  { id: "10", name: "Prof. Severus Snape" },
];

const MentorAssignmentDialog = ({ open, student, onClose }) => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [suggestions, setSuggestions] = useState(mockMentors);

  const handleMentorNameChange = (event) => {
    const value = event.target.value.trim();
    setSelectedMentor(value);
    setAnchorEl(event.currentTarget);
    setSuggestions(
      mockMentors.filter((mentor) =>
        mentor.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSave = () => {
    // TODO: Update mentor assignment for selected student in the backend using an API call
    console.log("Save mentor assignment", selectedMentor);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="mentor-dialog-title"
      maxWidth="md"
      fullWidth={true}
      sx={{ "& .MuiPaper-root": { maxWidth: 500 } }}
    >
      <DialogTitle id="mentor-dialog-title">Assign Mentor</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Mentor Name"
          type="text"
          fullWidth
          value={selectedMentor || ""}
          onChange={handleMentorNameChange}
          InputProps={{
            endAdornment: selectedMentor && (
              <IconButton onClick={handleClose}>
                <MentorSuggestionMenu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  suggestions={suggestions}
                  onMentorSelect={setSelectedMentor}
                />
              </IconButton>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MentorAssignmentDialog;

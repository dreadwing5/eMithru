import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import axios from "axios";
import MentorSuggestionMenu from "./MentorSuggestionMenu";

import api from "../../utils/axios";

const MentorAssignmentDialog = ({ open, student, onClose }) => {
  const [selectedMentor, setSelectedMentor] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await api.get("/users?role=faculty");
        const { data } = response.data;
        console.log(data);
        setMentors(data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMentors();
  }, []);

  const handleMentorNameChange = (event) => {
    const value = event.target.value.trim();
    if (value !== "") {
      setSuggestions(
        // Convert the list of names to a list of mentor objects
        mentors.filter((mentor) =>
          mentor.name.toLowerCase().startsWith(value.toLowerCase())
        )
      );

      setAnchorEl(event.target);
    } else {
      setSuggestions([]);
    }
    setSelectedMentor(event.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await api.post("/mentors", {
        mentorId: selectedMentor._id,
        menteeId: student._id,
        startDate: new Date().toISOString(),
      });
      console.log(response.data.message);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setSelectedMentor({});
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
          value={selectedMentor ? selectedMentor.name : ""}
          onChange={handleMentorNameChange}
        />
        {suggestions.length > 0 && (
          <MentorSuggestionMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            suggestions={suggestions}
            onMentorSelect={setSelectedMentor}
          />
        )}
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

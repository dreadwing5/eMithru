import { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Container,
  useTheme,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Menu,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
// import {  Menu } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import Page from "../components/Page";
import api from "../utils/axios";

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
const students1 = [
  {
    _id: "1",
    name: "John Smith",
    usn: "1RV18CS001",
    allocatedMentor: "Dr. Jane Doe",
  },
  {
    _id: "2",
    name: "Jane Doe",
    usn: "1RV18CS002",
    allocatedMentor: "Dr. John Smith",
  },
  {
    _id: "3",
    name: "Bob Johnson",
    usn: "1RV18CS003",
    allocatedMentor: "Dr. Sarah Johnson",
  },
  {
    _id: "4",
    name: "Sarah Johnson",
    usn: "1RV18CS004",
    allocatedMentor: "Dr. Bob Johnson",
  },
  {
    _id: "5",
    name: "Alice Brown",
    usn: "1RV18CS005",
    allocatedMentor: "Dr. Tom Green",
  },
  {
    _id: "6",
    name: "Tom Green",
    usn: "1RV18CS006",
    allocatedMentor: "Dr. Alice Brown",
  },
  {
    _id: "7",
    name: "Harry Potter",
    usn: "1RV18CS007",
    allocatedMentor: "Prof. Albus Dumbledore",
  },
  {
    _id: "8",
    name: "Hermione Granger",
    usn: "1RV18CS008",
    allocatedMentor: "Prof. Minerva McGonagall",
  },
  {
    _id: "9",
    name: "Ron Weasley",
    usn: "1RV18CS009",
    allocatedMentor: "Prof. Remus Lupin",
  },
  {
    _id: "10",
    name: "Draco Malfoy",
    usn: "1RV18CS010",
    allocatedMentor: "Prof. Severus Snape",
  },
];

export default function MentorAllocation() {
  const [students, setStudents] = useState(students1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const theme = useTheme();
  const tableHeaderColor =
    theme.palette.mode === "dark" ? "#37404a" : "#e9eaeb";

  // useEffect(() => {
  //   const fetchStudents = async () => {
  //     try {
  //       const response = await api.get("/students"); // Update the API endpoint as per your backend API
  //       setStudents(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchStudents();
  // }, []);

  const handleClick = (event, student) => {
    setSelectedStudent(student);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setDialogOpen(true);
    setSelectedMentor(student.allocatedMentor || "");
  };

  const handleMentorSelect = (mentor) => {
    setSelectedMentor(mentor);
  };

  const handleSave = () => {
    // TODO: Update mentor assignment for selected student in the backend using an API call
    console.log("Save mentor assignment", selectedMentor);
    setDialogOpen(false);
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setSelectedMentor(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <Page title="User: Account Settings">
      <Container maxWidth="lg">
        <TableContainer component={Paper}>
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: tableHeaderColor }}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>USN</TableCell>
                  <TableCell>Allocated Mentor</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.usn}</TableCell>
                    <TableCell>{student.allocatedMentor}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(event) => handleClick(event, student)}
                      >
                        <EditIcon />
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl && selectedStudent === student)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => handleEdit(selectedStudent)}>
                          Edit
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      </Container>
      {/* Dialog window for editing mentor assignment */}
      <Dialog
        open={dialogOpen}
        onClose={handleCancel}
        onKeyDown={handleKeyDown}
        aria-labelledby="mentor-dialog-title"
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
            onChange={(event) => setSelectedMentor(event.target.value.trim())}
            InputProps={{
              endAdornment: (
                <Menu
                  id="mentor-suggestion-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl && selectedMentor)}
                  onClose={handleClose}
                >
                  {mockMentors
                    .filter((mentor) =>
                      mentor.name
                        .toLowerCase()
                        .includes(selectedMentor?.toLowerCase() || "")
                    )
                    .map((mentor) => (
                      <MenuItem
                        key={mentor.id}
                        onClick={() => {
                          handleMentorSelect(mentor.name);
                          handleClose();
                        }}
                      >
                        {mentor.name}
                      </MenuItem>
                    ))}
                </Menu>
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
    </Page>
  );
}

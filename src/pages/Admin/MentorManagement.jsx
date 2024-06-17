import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Autocomplete,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import api from "../../utils/axios";

const Root = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
}));

const MentorManagement = () => {
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchStudents();
    fetchMentors();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/students");
      const { data } = response.data;
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchMentors = async () => {
    try {
      const response = await api.get("/users?role=faculty");
      const { data } = response.data;
      setMentors(data.users);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  const handleAllocateMentor = (student) => {
    setSelectedStudent(student);
    setSearchQuery("");
  };

  const handleMentorSearch = (event, value) => {
    setSearchQuery(value);
  };

  const handleMentorSelect = async (mentor) => {
    try {
      await api.post("/mentorship", {
        mentorId: mentor.id,
        menteeId: selectedStudent.id,
        startDate: new Date().toISOString(),
      });
      setSelectedStudent(null);
      fetchStudents();
    } catch (error) {
      console.error("Error allocating mentor:", error);
    }
  };

  const filteredMentors = mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Root>
      <Typography variant="h4" gutterBottom>
        Mentor Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Allocated Mentor</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  {student.mentor ? student.mentor.name : "Not Assigned"}
                </TableCell>
                <TableCell>
                  {selectedStudent === student ? (
                    <Autocomplete
                      options={filteredMentors}
                      getOptionLabel={(mentor) => mentor.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search Mentor"
                          variant="outlined"
                          size="small"
                          value={searchQuery}
                          onChange={handleMentorSearch}
                        />
                      )}
                      onChange={(event, value) => handleMentorSelect(value)}
                    />
                  ) : (
                    <IconButton
                      onClick={() => handleAllocateMentor(student)}
                      disabled={student.mentor}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Root>
  );
};

export default MentorManagement;

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  TextField,
  Autocomplete,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import axios from "axios";

const Root = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
}));

const MentorManagement = () => {
  const [faculties, setFaculties] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchFaculties();
    fetchStudents();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get("/api/users?role=faculty");
      setFaculties(response.data);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/users?role=student");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddMentee = async (facultyId, menteeId) => {
    try {
      await axios.post("/api/mentorship", {
        mentorId: facultyId,
        menteeId: menteeId,
        startDate: new Date().toISOString(),
      });
      // Refresh the faculties list after adding a mentee
      fetchFaculties();
    } catch (error) {
      console.error("Error adding mentee:", error);
    }
  };

  const handleDeleteMentee = async (facultyId, menteeId) => {
    try {
      await axios.delete(`/api/mentorship/${menteeId}`);
      // Refresh the faculties list after deleting a mentee
      fetchFaculties();
    } catch (error) {
      console.error("Error deleting mentee:", error);
    }
  };

  const filteredFaculties = faculties.filter((faculty) =>
    faculty.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Root>
      <Typography variant="h4" gutterBottom>
        Mentor Management
      </Typography>
      <Card>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                placeholder="Search faculty..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Grid>
          </Grid>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Faculty (Mentor)</TableCell>
                  <TableCell>Mentee</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredFaculties.map((faculty) => (
                  <TableRow key={faculty._id}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          alt={faculty.name}
                          src={faculty.avatar}
                          sx={{ mr: 2 }}
                        />
                        <div>
                          {faculty.name}
                          <Typography variant="body2" color="textSecondary">
                            {faculty.email}
                          </Typography>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {faculty.mentees &&
                        faculty.mentees.map((mentee) => (
                          <Box
                            key={mentee._id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <Typography variant="body2" sx={{ mr: 1 }}>
                              {mentee.name}
                            </Typography>
                            <Typography variant="body2">
                              {mentee.email}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleDeleteMentee(faculty._id, mentee._id)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        ))}
                      <Autocomplete
                        options={students}
                        getOptionLabel={(student) => student.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select mentee"
                            variant="outlined"
                            size="small"
                          />
                        )}
                        onChange={(event, student) => {
                          if (student) {
                            handleAddMentee(faculty._id, student._id);
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Root>
  );
};

export default MentorManagement;

import React, { useState, useEffect } from "react";
import {
  Box,
  TableContainer,
  Paper,
  Container,
  MenuItem,
  Select,
} from "@mui/material";

import Page from "../../components/Page";
import api from "../../utils/axios";
import StudentTable from "./StudentTable";
import MentorAssignmentDialog from "./MentorAssignmentDialog";

const MentorAllocation = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterOption, setFilterOption] = useState("all");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/students");
        const { students } = response.data;
        console.log(students);
        setStudents(students);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const filteredStudents = students.filter((student) => {
    if (filterOption === "all") {
      return true;
    } else if (filterOption === "assigned") {
      return student.mentor && student.mentor.name;
    } else {
      return !student.mentor || !student.mentor.name;
    }
  });

  return (
    <Page title="User: Account Settings">
      <Container maxWidth="lg">
        <TableContainer component={Paper}>
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="assigned">Assigned Mentors</MenuItem>
              <MenuItem value="unassigned">Unassigned Mentors</MenuItem>
            </Select>

            <StudentTable
              students={filteredStudents}
              onEdit={handleEdit}
            ></StudentTable>
          </Box>
        </TableContainer>
      </Container>

      <MentorAssignmentDialog
        open={dialogOpen}
        student={selectedStudent}
        onClose={handleDialogClose}
      />
    </Page>
  );
};

export default MentorAllocation;

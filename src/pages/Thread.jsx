import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Divider,
} from "@mui/material";
import api from "../utils/axios";

function StudentList({ onStudentClick }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/students");
        // Replace with actual API

        const { status, students } = response.data;
        console.log(response);
        if (status === "success") {
          setStudents(students);
        } else {
          throw new Error("Error fetching students");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  const handleStudentClick = (student) => {
    onStudentClick(student);
  };

  return (
    <List>
      {students.map((student) => (
        <ListItem key={student._id} onClick={() => handleStudentClick(student)}>
          <ListItemAvatar>
            <Avatar>{student.name[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={student.name} />
        </ListItem>
      ))}
    </List>
  );
}

function ThreadList({ threads }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rowsPerPageOptions = [5, 10, 25];

  return (
    <TableContainer component={Paper}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Open Date</TableCell>
              <TableCell>Close Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {threads
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((thread) => (
                <TableRow key={thread._id}>
                  <TableCell>{thread.title}</TableCell>
                  <TableCell>{thread.tag}</TableCell>
                  <TableCell>{thread.createdBy.name}</TableCell>
                  <TableCell>{thread.state}</TableCell>
                  <TableCell>
                    {new Date(thread.openDate).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {thread.closeDate
                      ? new Date(thread.closeDate).toLocaleString()
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "8px",
          }}
        >
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={threads.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPage
            Change={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </TableContainer>
  );
}
function Thread() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [threads, setThreads] = useState([]);

  const handleStudentClick = async (student) => {
    setSelectedStudent(student);
    const mentorId = "6440840795719c38cc99d814"; // Replace with the mentor ID
    const response = await api.get(
      `/threads/search/${mentorId}/${student._id}`
    );
    const { status, data } = response.data;
    console.log(data);
    if (status === "success") {
      setThreads(data.threads);
    } else {
      console.error("Error fetching threads");
    }
  };

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
      <Box
        sx={{ flex: "0 0 30%", borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <StudentList onStudentClick={handleStudentClick} />
      </Box>
      <Box sx={{ flex: "1 1 auto", p: 2 }}>
        {selectedStudent === null ? (
          <Typography variant="h6" textAlign="center">
            No threads are displayed. Select a student to fetch their threads.
          </Typography>
        ) : (
          <ThreadList threads={threads} />
        )}
      </Box>
    </Box>
  );
}

export default React.memo(Thread);

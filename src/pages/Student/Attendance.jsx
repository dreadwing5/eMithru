import { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";

const attendanceData = [
  {
    subjectCode: "SUB-101",
    subjectName: "Mathematics",
    semester: 1,
    year: 2022,
    months: [
      {
        month: 1,
        classesTaken: 20,
        classesAttended: 16,
      },
      {
        month: 2,
        classesTaken: 20,
        classesAttended: 15,
      },
      {
        month: 3,
        classesTaken: 20,
        classesAttended: 18,
      },
    ],
  },
  {
    subjectCode: "SUB-102",
    subjectName: "Science",
    semester: 1,
    year: 2022,
    months: [
      {
        month: 1,
        classesTaken: 20,
        classesAttended: 18,
      },
      {
        month: 2,
        classesTaken: 20,
        classesAttended: 17,
      },
      {
        month: 3,
        classesTaken: 20,
        classesAttended: 19,
      },
    ],
  },
  // Add data for more subjects
];

const Attendance = () => {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const theme = useTheme();
  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const getMonthAttendance = (subject) => {
    const attendance = subject.months.find(
      (month) => month.month === selectedMonth
    );
    return attendance
      ? `${attendance.classesAttended}/${attendance.classesTaken}`
      : "-";
  };

  return (
    <Box sx={{ p: 2 }}>
      <h1 sx={{ textAlign: "center", mb: 2 }}>Attendance Report</h1>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <label>Select Month:</label>
        <Select value={selectedMonth} onChange={handleChange} sx={{ ml: 1 }}>
          {attendanceData[0].months.map((month) => (
            <MenuItem key={month.month} value={month.month}>
              {month.month}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <TableContainer sx={{ bgcolor: "#f5f5f5" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject Code</TableCell>
              <TableCell>Subject Name</TableCell>
              <TableCell>Attendance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData.map((subject) => (
              <TableRow key={subject.subjectCode}>
                <TableCell>{subject.subjectCode}</TableCell>
                <TableCell>{subject.subjectName}</TableCell>
                <TableCell>{getMonthAttendance(subject)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Attendance;

import { useState, useEffect } from "react";
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
  // Add data for more semesters
];

const Attendance = () => {
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(0);

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const getMonthAttendance = (subject) => {
    const attendance = subject.months.find(
      (month) => month.month === selectedMonth
    );
    return attendance
      ? `${attendance.classesAttended}/${attendance.classesTaken} (${(
          (attendance.classesAttended / attendance.classesTaken) *
          100
        ).toFixed(2)}%)`
      : "-";
  };

  const getCumulativeAttendance = (subject) => {
    const attended = subject.months.reduce(
      (total, month) => total + month.classesAttended,
      0
    );
    const taken = subject.months.reduce(
      (total, month) => total + month.classesTaken,
      0
    );
    const percentage = ((attended / taken) * 100).toFixed(2);
    return `${attended}/${taken} (${percentage}%)`;
  };

  const getOverallAttendance = () => {
    const attended = attendanceData.reduce((total, subject) => {
      const attended = subject.months.reduce(
        (total, month) => total + month.classesAttended,
        0
      );
      return total + attended;
    }, 0);
    const taken = attendanceData.reduce((total, subject) => {
      const taken = subject.months.reduce(
        (total, month) => total + month.classesTaken,
        0
      );
      return total + taken;
    }, 0);
    const percentage = ((attended / taken) * 100).toFixed(2);
    return `${attended}/${taken} (${percentage}%)`;
  };

  useEffect(() => {
    // Add code to send notification if overall attendance is less than 75%
  }, [getOverallAttendance()]);

  return (
    <Box sx={{ p: 2 }}>
      <h1 sx={{ textAlign: "center", mb: 2 }}>Attendance Report</h1>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <label>
          Select Semester:
          <Select
            value={selectedSemester}
            onChange={handleSemesterChange}
            sx={{ ml: 1 }}
          >
            {Array.from({ length: 8 }, (_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                Semester {index + 1}
              </MenuItem>
            ))}
          </Select>
        </label>
        <Box sx={{ ml: 2 }}>
          <label>
            Select Month:
            <Select
              value={selectedMonth}
              onChange={handleMonthChange}
              sx={{ ml: 1 }}
            >
              <MenuItem value={0}>All</MenuItem>
              {Array.from({ length: 3 }, (_, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  Month {index + 1}
                </MenuItem>
              ))}
            </Select>
          </label>
        </Box>
      </Box>
      <TableContainer sx={{ border: "1px solid gray" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ border: "1px solid gray" }}>
                Subject Code
              </TableCell>
              <TableCell sx={{ border: "1px solid gray" }}>
                Subject Name
              </TableCell>
              <TableCell sx={{ border: "1px solid gray" }}>
                Attendance
              </TableCell>
              <TableCell sx={{ border: "1px solid gray" }}>
                Cumulative Attendance
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData
              .filter((subject) => subject.semester === selectedSemester)
              .map((subject) => (
                <TableRow key={subject.subjectCode}>
                  <TableCell sx={{ border: "1px solid gray" }}>
                    {subject.subjectCode}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid gray" }}>
                    {subject.subjectName}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid gray" }}>
                    {getMonthAttendance(subject)}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid gray" }}>
                    {getCumulativeAttendance(subject)}
                  </TableCell>
                </TableRow>
              ))}
            <TableRow sx={{ fontWeight: "bold" }}>
              <TableCell colSpan={2}>Overall Attendance</TableCell>
              <TableCell>
                {getOverallAttendance()}{" "}
                <Box component="span" sx={{ ml: 1 }}>
                  (for all subjects)
                </Box>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Attendance;

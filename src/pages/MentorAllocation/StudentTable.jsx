import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const StudentTable = ({ students, onEdit }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>USN</TableCell>
          <TableCell>Allocated Mentor</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.usn}</TableCell>
            <TableCell>
              {student.mentor && student.mentor.name
                ? student.mentor.name
                : "Unassigned"}
            </TableCell>
            <TableCell>
              <EditIcon onClick={() => onEdit(student)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentTable;

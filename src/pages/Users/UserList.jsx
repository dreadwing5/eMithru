import React, { useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TableContainer,
  Paper,
  useTheme,
  Avatar,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
  TablePagination,
  Divider,
} from "@mui/material";
import { useSnackbar } from "notistack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import ConfirmationDialog from "./ConfirmationDialog";
import { useEffect } from "react";

const generateUsers = async (count) => {
  const response = await fetch(`https://randomuser.me/api/?results=${count}`);
  const data = await response.json();

  const users = data.results.map((result, index) => ({
    id: index + 1,
    name: `${result.name.first} ${result.name.last}`,
    email: result.email,
    role: "User",
    phone: result.phone,
  }));

  return users;
};

function UserList({ onEdit }) {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { enqueueSnackbar } = useSnackbar();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rowsPerPageOptions = [5, 10, 25];

  const tableHeaderColor =
    theme.palette.mode === "dark" ? "#37404a" : "#e9eaeb";

  // Placeholder until we can fetvh our own user
  useEffect(() => {
    generateUsers(15).then((users) => setUsers(users));
  }, []);

  const handleEdit = (user) => {
    onEdit(user);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    console.log("CLOSING");
    setOpenDialog(false);
    handleClose();
  };

  const handleConfirmDelete = () => {
    // Perform delete operation (e.g., call API to delete user)
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== selectedUser.id)
    );

    enqueueSnackbar("User deleted successfully", { variant: "success" });
    setOpenDialog(false);
    handleClose();
  };

  const handleClick = (event, user) => {
    setSelectedUser(user);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Table>
            <TableHead sx={{ backgroundColor: tableHeaderColor }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          flex: 1,
                          width: "100%",
                        }}
                      >
                        <Avatar
                          alt={user.name}
                          src="/broken-image.jpg"
                          sx={{ width: 50, height: 50 }}
                        />
                        <Typography sx={{ ml: 1 }}>{user.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <IconButton onClick={(event) => handleClick(event, user)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => handleEdit(selectedUser)}>
                          <ListItemIcon>
                            <EditIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Edit" />
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(selectedUser)}>
                          <ListItemIcon>
                            <DeleteIcon
                              fontSize="small"
                              sx={{ color: "error.main" }}
                            />
                          </ListItemIcon>
                          <ListItemText primary="Delete" />
                        </MenuItem>
                      </Menu>
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
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Box>
      </TableContainer>

      <ConfirmationDialog
        open={openDialog}
        title="Delete User"
        message={`Are you sure you want to delete ${selectedUser?.name}?`}
        onConfirm={handleConfirmDelete}
        onClose={handleCloseDialog}
      />
    </>
  );
}

export default UserList;

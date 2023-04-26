//TODO : Refactor thread component

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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Select,
  useTheme,
} from "@mui/material";

import {
  Search,
  MoreVert,
  Edit,
  Delete,
  Add,
  Close,
} from "@mui/icons-material";
import api from "../utils/axios";

const TestComponent = ({ thread }) => {
  return (
    <Box>
      <Typography variant="h4">{thread.title}</Typography>
      <Typography variant="body1">{thread.description}</Typography>
    </Box>
  );
};

/* FIXME
The ThreadList component is being rendered many times.
This can cause performance related isuue

*/
const ThreadList = ({
  threads,
  onThreadClick,
  onThreadEdit,
  onThreadDelete,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);

  console.log("THREADS", threads);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rowsPerPageOptions = [5, 10, 25];

  const handleMenuOpen = (event, thread) => {
    setSelectedThread(thread);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const statusColors = {
    open: "#4caf50",
    "In Progress": "#ff9800",
    closed: "#f44336",
  };

  return (
    <TableContainer component={Paper}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell style={{ display: "flex", alignItems: "center" }}>
                Members
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {threads
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((thread) => (
                <TableRow key={thread._id}>
                  <TableCell>{thread.title}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        backgroundColor: statusColors[thread.state],
                        borderRadius: "12px",
                        padding: "0 8px",
                        color: "white",
                      }}
                    >
                      {thread.state}
                    </Typography>
                  </TableCell>
                  <TableCell>{thread.tag}</TableCell>
                  <TableCell>
                    {new Date(thread.openDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell style={{ display: "flex", cursor: "pointer" }}>
                    {thread.participants.slice(0, 3).map((participant, idx) => (
                      <Tooltip
                        key={idx}
                        title={`${participant.name}`}
                        placement="top"
                      >
                        <Avatar
                          sx={{
                            ml: idx === 0 ? 0 : -1,
                            zIndex: idx === 0 ? 3 : 2 - idx,
                          }}
                          alt={participant.name}
                        >
                          {participant.name[0]}
                        </Avatar>
                      </Tooltip>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-around" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onThreadClick(thread)}
                      >
                        View
                      </Button>
                      <IconButton
                        onClick={(event) => handleMenuOpen(event, thread)}
                      >
                        <MoreVert />
                      </IconButton>

                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem
                          onClick={(event) => {
                            handleMenuClose();
                            onThreadEdit(selectedThread);
                          }}
                        >
                          <ListItemIcon>
                            <Edit fontSize="small" />
                          </ListItemIcon>
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={(event) => {
                            handleMenuClose();
                            onThreadDelete(selectedThread);
                          }}
                        >
                          <ListItemIcon>
                            <Delete fontSize="small" />
                          </ListItemIcon>
                          Delete
                        </MenuItem>
                      </Menu>
                    </Box>
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
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </TableContainer>
  );
};

const NewThreadDialog = ({ open, onClose, users, userId, onSave }) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [newThreadData, setNewThreadData] = useState({
    title: "",
    tag: "",
    createdBy: userId,
    participants: [{ _id: userId, name: "Current User" }],
  });

  const categories = ["general", "attendance", "performance", "well-being"];

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [searchTerm]);

  const handleCloseDialog = () => {
    onClose();
    setNewThreadData({
      title: "",
      tag: "",
      createdBy: userId,
      participants: [{ _id: userId, name: "Current User" }],
    });
    setSearchTerm("");
  };

  const handleNewThreadChange = (e) => {
    setNewThreadData({ ...newThreadData, [e.target.name]: e.target.value });
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddMember = (member) => {
    if (!newThreadData.participants.find((m) => m._id === member._id)) {
      setNewThreadData({
        ...newThreadData,
        participants: [...newThreadData.participants, member],
      });
    }
  };

  const handleRemoveMember = (memberId) => {
    if (memberId === userId) {
      return; // Prevents removal of the current user
    }
    setNewThreadData({
      ...newThreadData,
      participants: newThreadData.participants.filter(
        (participant) => participant._id !== memberId
      ),
    });
  };

  const handleSave = () => {
    onSave(newThreadData);
    handleCloseDialog();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      sx={{
        "& .MuiPaper-root": {
          width: "50vh",
        },
      }}
    >
      <DialogTitle>Create a new thread</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexDirection: "column",
          }}
        >
          <Box sx={{ py: 1 }}>
            <TextField
              label="Title"
              name="title"
              value={newThreadData.title}
              onChange={handleNewThreadChange}
              fullWidth
            />
          </Box>
          <Box sx={{ py: 1 }}>
            <Select
              label="Category"
              name="tag"
              value={newThreadData.tag}
              onChange={handleNewThreadChange}
              fullWidth
            >
              <MenuItem value="Category" disabled>
                Category
              </MenuItem>
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ py: 1 }}>
            <TextField
              label="Search user"
              value={searchTerm}
              onChange={handleSearchTermChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Box>
        </Box>
        <List>
          {filteredUsers.map((user) => (
            <ListItem
              key={user._id}
              onClick={() => handleAddMember(user)}
              sx={{
                "&:hover": { backgroundColor: theme.palette.action.hover },
              }}
            >
              <ListItemAvatar>
                <Avatar>{user.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </List>
        <Typography variant="subtitle1" mt={2}>
          Members:
        </Typography>
        <List>
          {newThreadData.participants.map((participant) => (
            <ListItem key={participant._id} sx={{ cursor: "pointer" }}>
              <Avatar
                sx={{
                  position: "relative",
                  "&:hover > .MuiIconButton-root": {
                    visibility: "visible",
                  },
                }}
              >
                {participant.name[0]}
                <IconButton
                  sx={{
                    visibility: "hidden",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: "rgba(0,0,0,0.5)",
                  }}
                  onClick={() => handleRemoveMember(participant._id)}
                >
                  <Close sx={{ color: "white" }} />
                </IconButton>
              </Avatar>
              <ListItemText sx={{ ml: 2 }} primary={participant.name} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

const Thread = () => {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [users, setUsers] = useState([]);

  // Todo : Remove userID to the actual logged in userId
  const userId = "6440827f7b7d9337a2202d16";

  const fetchThreads = useCallback(async () => {
    try {
      const response = await api.get(`users/${userId}/threads`);
      if (response.data.status === "success") {
        setThreads(response.data.data.threads);
      }
    } catch (error) {
      console.error("Error fetching threads:", error);
    }
  }, [userId]);

  //TODO : Change this to Fetch only the student of the mentor

  const fetechUsers = useCallback(async () => {
    try {
      const response = await api.get("users");
      if (response.data.status === "success") {
        setUsers(response.data.data.users);
      }
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  }, []);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  useEffect(() => {
    fetechUsers();
  }, [fetechUsers]);

  /*   TODO : User should be naviagated to new route when the user clicks on the view thread @critical

*/

  const handleThreadClick = (thread) => {
    setSelectedThread(thread);
  };

  const handleAddNewThread = async (newThreadData) => {
    try {
      const response = await api.post("threads", newThreadData);
      if (response.data.status === "success") {
        const newThread = response.data.data.thread;
        setThreads([...threads, newThread]);
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error creating new thread:", error);
    }
  };

  // TODO : Add the Edit Functionality
  const handleThreadEdit = (thread) => {
    console.log(`Edit thread ${thread._id}`);
  };

  const handleThreadDelete = async (thread) => {
    try {
      console.log(`Delete thread ${thread._id}`);
      const response = await api.delete(`/threads/${thread._id}`);
      if (response.status === 204) {
        setThreads(threads.filter((curr) => curr._id !== thread._id));
      }
    } catch (error) {
      console.error("ERROR OCCURED 💥 ", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
      <Box sx={{ flex: "1 1 auto", p: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          startIcon={<Add />}
          sx={{ float: "right", mt: 1, mb: 2 }}
        >
          Add new
        </Button>
        {selectedThread === null ? (
          threads.length === 0 ? (
            <Typography variant="h6" textAlign="center">
              No thread found
            </Typography>
          ) : (
            <ThreadList
              threads={threads}
              onThreadClick={handleThreadClick}
              onThreadEdit={handleThreadEdit}
              onThreadDelete={handleThreadDelete}
            />
          )
        ) : (
          <TestComponent thread={selectedThread} />
        )}

        <NewThreadDialog
          open={openDialog}
          onClose={handleCloseDialog}
          users={users}
          userId={userId}
          onSave={handleAddNewThread}
        />
      </Box>
    </Box>
  );
};

export default React.memo(Thread);

//TODO : Refactor thread component

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Divider,
  Button,
  CircularProgress,
  Container,
} from "@mui/material";

import { useSnackbar } from "notistack";

import NewThreadDialog from "./NewThreadDialog";
import ThreadList from "./ThreadList";
import Page from "../../components/Page";

import { Add } from "@mui/icons-material";
import api from "../../utils/axios";

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

/* 
TODO
1. The threadlist should display a loading spinner
2. The threadlist should be on the center
3. Add breadcrumbs and title of the section
4. navigate to conversation item when clicked on view
5. OnSaving the thread it should display a snackbar (no-stick)
6. Handle error and display snackbar as well as log the error on console
7. Fix various performance related issue that is causing the compoent to rerender multipl times.
8. Refactor component and split in multiple smaller compenent
9. The label of the category is not visiable in  the select dropdown
*/

const LoadingSpinner = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    }}
  >
    <CircularProgress />
  </Box>
);

const Thread = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [threads, setThreads] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Todo : Remove userID to the actual logged in userId
  const userId = "6440827f7b7d9337a2202d16";

  const fetchThreads = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`users/${userId}/threads`);
      if (response.data.status === "success") {
        setThreads(response.data.data.threads);
      }

      //TODO: Remove this in production

      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // simulate delay of 1 second
    } catch (error) {
      setIsLoading(false);
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
    navigate(`/threads/${thread._id}`);
  };

  const handleAddNewThread = async (newThreadData) => {
    setIsLoading(true);
    try {
      const response = await api.post("threads", newThreadData);
      if (response.data.status === "success") {
        const newThread = response.data.data.thread;
        setThreads([...threads, newThread]);
        setIsLoading(false);
        return Promise.resolve();
      }
    } catch (error) {
      setIsLoading(false);
      return Promise.reject(error);
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
        enqueueSnackbar("Thread Deleted successfully!", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
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
    <Page title="Thread">
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography variant="h4" component="h1">
              Threads
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialog}
              startIcon={<Add />}
              sx={{ mt: 1, mb: 2 }}
            >
              Add new
            </Button>
          </Box>
          <Divider />
          {isLoading ? (
            <LoadingSpinner />
          ) : threads.length === 0 ? (
            <Typography variant="h6" textAlign="center" mt={2}>
              No threads found. Create a new thread to get started!
            </Typography>
          ) : (
            <ThreadList
              threads={threads}
              onThreadClick={handleThreadClick}
              onThreadEdit={handleThreadEdit}
              onThreadDelete={handleThreadDelete}
            />
          )}
          <NewThreadDialog
            open={openDialog}
            onClose={handleCloseDialog}
            users={users}
            userId={userId}
            onSave={handleAddNewThread}
          />
        </Box>
      </Container>
    </Page>
  );
};
export default React.memo(Thread);

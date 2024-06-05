import { useState, useEffect, React } from "react";

import {
  Avatar,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Tooltip,
  Dialog,
  DialogContent,
  DialogActions,
  InputAdornment,
  Grid,
  IconButton,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import GetApp from "@mui/icons-material/GetApp";

import Page from "../../components/Page";
import api from "../../utils/axios"; // replace with your actual API path
import axios from "axios";
import ProtectedRouteWrapper from "../../ProtectedRoute";

const baseURL = import.meta.env.VITE_PYTHON_API;

import processTableData from "./ExportToExcel";

/* 
TODO : The export to excel button should be on the right side

On top of the card there should be a filter form 

New Features for data filt:


Add a search bar which should be able to display only the rows that contains the user
add sort by open and close
Add date fileter with from and to date
add sort option for date
Add filter for category

*/

/*

Excel report :

The header should be marked bold, with a sticky header and it should have a color,
Remove the _id and _v field from the data,
date should be an excel date format,
Excel file name should be a timestamp
participant name should be there as comma seperate list


*/
const Report = () => {
  const [threads, setThreads] = useState([]);

  const [openDialogThreadId, setOpenDialogThreadId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredThreads = threads.filter((thread) => {
    // Check for matching participant names
    const hasMatchingParticipant = thread.participants.some((participant) =>
      participant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Check if the thread's open date is within the specified date range
    const openDate = new Date(thread.openDate);
    const fromDateObj = fromDate ? new Date(fromDate) : null;
    const toDateObj = toDate ? new Date(toDate) : null;

    const openDateInRange =
      (!fromDateObj || openDate >= fromDateObj) &&
      (!toDateObj || openDate <= toDateObj);

    return hasMatchingParticipant && openDateInRange;
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenDialog = (threadId) => {
    // add parameter
    setOpenDialogThreadId(threadId); // set the current thread ID
  };

  const handleCloseDialog = () => {
    setOpenDialogThreadId(null); // reset the current thread ID
  };

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await api.get("threads");
        if (response.status === 200) {
          const { data } = response.data;
          console.log(data.threads);
          setThreads(data.threads);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchThreads();
  }, []);

  const statusColors = {
    open: "#4caf50",
    "In Progress": "#ff9800",
    closed: "#f44336",
  };

  const handleExportToExcel = async () => {
    const data = processTableData(threads);
    try {
      const response = await axios.post(`${baseURL}generate_excel`, data, {
        responseType: "blob",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(response.data);
      link.download = "report.xlsx";
      document.body.appendChild(link); // Append the link to the document
      link.click();

      // Cleanup
      URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    // const timestamp = new Date().toISOString();
    // exportToExcel(threads);
  };

  return (
    <Page title="Thread">
      <Container maxWidth="xl" sx={{ overflowX: "hidden", overflowY: "auto" }}>
        <Box
          display="flex"
          sx={{ mt: 6 }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4" component="h1">
            Threads Report
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleExportToExcel}
            startIcon={<GetApp />}
          >
            Export to Excel
          </Button>
        </Box>
        <Grid container spacing={2} sx={{ mt: 2, mb: 3 }}>
          <Grid item xs={6} md={2}>
            <TextField
              label="Sort by"
              variant="outlined"
              select
              fullWidth
              defaultValue=""
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="openDate">Open date</MenuItem>
              <MenuItem value="closeDate">Close date</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6} md={2}>
            <TextField
              label="Category"
              variant="outlined"
              select
              fullWidth
              defaultValue=""
            >
              <MenuItem value="">All</MenuItem>
              {/* Add your categories here */}
              <MenuItem value="category1">Category 1</MenuItem>
              <MenuItem value="category2">Category 2</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6} md={2}>
            <TextField
              label="From date"
              type="date"
              variant="outlined"
              fullWidth
              value={fromDate}
              onChange={handleFromDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <TextField
              label="To date"
              type="date"
              variant="outlined"
              fullWidth
              value={toDate}
              onChange={handleToDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              label="Search"
              fullWidth
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "background.neutral" }}>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Opened Date</TableCell>
                  <TableCell>Closed date</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Members</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {threads.map((thread) => (
                  <TableRow key={thread._id}>
                    <TableCell>{thread.title}</TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          maxHeight: "5rem",
                          maxWidth: "20rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <Typography sx={{ textAlign: "justify" }}>
                          {thread.description}
                        </Typography>
                      </Box>
                      <Button onClick={() => handleOpenDialog(thread._id)}>
                        Read more
                      </Button>{" "}
                      {/* pass the thread ID */}
                      <Dialog
                        open={openDialogThreadId === thread._id} // check if this thread's dialog should be open
                        onClose={handleCloseDialog}
                      >
                        <DialogContent>
                          <Typography>{thread.description}</Typography>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseDialog}>Close</Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          backgroundColor: statusColors[thread.status],
                          borderRadius: "12px",
                          padding: "0 8px",
                          color: "white",
                        }}
                      >
                        {thread.status}
                      </Typography>
                    </TableCell>
                    <TableCell>{thread.topic}</TableCell>
                    <TableCell>
                      {new Date(thread.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {thread.closedAt
                        ? new Date(thread.closedAt).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>{thread.author.name}</TableCell>
                    <TableCell style={{ display: "flex", cursor: "pointer" }}>
                      {thread.participants
                        .slice(0, 3)
                        .map((participant, idx) => (
                          <Tooltip
                            key={idx}
                            title={`${participant.name}`}
                            placement="top"
                          >
                            <Avatar
                              sx={{
                                ml: idx === 0 ? 0 : -1,
                              }}
                              alt={participant.name}
                            >
                              {participant.name[0]}
                            </Avatar>
                          </Tooltip>
                        ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Page>
  );
};
export default function ProtectedReport() {
  return (
    <ProtectedRouteWrapper allowedRoles={["admin"]}>
      <Report />
    </ProtectedRouteWrapper>
  );
}

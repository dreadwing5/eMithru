import { Container, Grid, Typography, Box } from "@mui/material";

import Page from "../components/Page";
import { Card, CardHeader, CardContent } from "@mui/material";
import { useState } from "react";
// import comingSoon from "../public/coming-soon.png";
import Image from "mui-image";

//Dialog
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Tooltip,
	Fab,
} from "@mui/material";

import { BugReport as BugReportIcon } from "@mui/icons-material";
import DashboardHeader from "../components/DashboardHeader";

const TaskWidget = () => {
	return (
		<Card>
			<CardHeader title="Tasks" />
			<CardContent>
				<Typography variant="body1">Your task list goes here.</Typography>
			</CardContent>
		</Card>
	);
};

const MeetingWidget = () => {
	return (
		<Card>
			<CardHeader title="Meetings" />
			<CardContent>
				<Typography variant="body1">Your meeting list goes here.</Typography>
			</CardContent>
		</Card>
	);
};

const BugReportDialog = ({ open, onClose }) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}>
			<DialogTitle>Report a Bug</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="bug-title"
					label="Bug Title"
					type="text"
					fullWidth
					variant="outlined"
				/>
				<TextField
					margin="dense"
					id="bug-description"
					label="Bug Description"
					type="text"
					fullWidth
					variant="outlined"
					multiline
					rows={4}
				/>
				<FormControl
					fullWidth
					variant="outlined"
					margin="dense">
					<InputLabel id="bug-priority-label">Priority</InputLabel>
					<Select
						labelId="bug-priority-label"
						id="bug-priority"
						label="Priority">
						<MenuItem value="low">Low</MenuItem>
						<MenuItem value="medium">Medium</MenuItem>
						<MenuItem value="high">High</MenuItem>
					</Select>
				</FormControl>
				<TextField
					margin="dense"
					id="bug-image"
					label="Upload Image"
					type="file"
					fullWidth
					variant="outlined"
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button
					onClick={onClose}
					variant="contained"
					color="primary">
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	);
};

const Dashboard = () => {
	const [bugReportDialogOpen, setBugReportDialogOpen] = useState(false);

	const handleBugReportDialogOpen = () => {
		setBugReportDialogOpen(true);
	};

	const handleBugReportDialogClose = () => {
		setBugReportDialogOpen(false);
	};

	return (
		<Page title="Dashboard">
			<DashboardHeader />
			{/* <Container maxWidth="xl">
				<Box sx={{ mb: 5 }}>
					<Typography variant="h4">
						Dashboard <sup style={{ fontSize: "0.8rem" }}>Beta</sup>
					</Typography>
				</Box>
				<Grid
					container
					spacing={3}>
					<Grid
						item
						xs={12}
						md={6}>
						<TaskWidget />
					</Grid>
					<Grid
						item
						xs={12}
						md={6}>
						<MeetingWidget />
					</Grid>
					{/* 
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image src={comingSoon} width="700px" duration={1000} />
            </Box>
          </Grid> */}
			{/* <Grid
						item
						xs={12}
						md={12}>
						<Box sx={{ textAlign: "center" }}>
							<Typography variant="h5">More features coming soon!</Typography>
						</Box>
					</Grid>
				</Grid>

				<Tooltip title="Report Bug">
					<Fab
						color="primary"
						aria-label="report bug"
						onClick={handleBugReportDialogOpen}
						sx={{
							position: "fixed",
							bottom: 16,
							right: 16,
						}}>
						<BugReportIcon />
					</Fab>
				</Tooltip>
				<BugReportDialog
					open={bugReportDialogOpen}
					onClose={handleBugReportDialogClose}
				/>
			</Container>  */}
		</Page>
	);
};

export default Dashboard;

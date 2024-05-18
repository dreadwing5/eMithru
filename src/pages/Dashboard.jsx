import { Container, Grid, Typography, Box, useTheme } from "@mui/material";
import Page from "../components/Page";
import { Card, CardHeader, CardContent, CardActionArea } from "@mui/material";
import { useState } from "react";
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
import {
	BugReport as BugReportIcon,
	Person as PersonIcon,
	School as SchoolIcon,
	Work as WorkIcon,
	CheckCircle as CheckCircleIcon,
	People as PeopleIcon,
	Assignment as AssignmentIcon,
	Book as BookIcon,
	EmojiEvents as EmojiEventsIcon,
	Today as TodayIcon,
	Group as GroupIcon,
} from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";
const StudentTile = ({ title, icon, link }) => {
	const theme = useTheme();
	return (
		<Card
			sx={{
				transition: "transform 0.2s",
				"&:hover": {
					transform: "scale(1.05)",
				},
			}}>
			<CardActionArea
				component="a"
				href={link}>
				<CardContent
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "column",
						backgroundColor: theme.palette.secondary[200],
						color: blueGrey[100],
						minHeight: "230px",
						"&:hover": {
							backgroundColor: theme.palette.primary[600],
						},
					}}>
					{icon}
					<Typography
						variant="h6"
						component="div"
						sx={{ mt: 1 }}>
						{title}
					</Typography>
				</CardContent>
			</CardActionArea>
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
		<Page title="Home">
			<Container
				maxWidth="xl"
				sx={{
					p: 8,
				}}>
				<Grid
					container
					spacing={3}>
					<Grid
						item
						xs={12}
						sm={6}
						md={4}>
						<StudentTile
							title="Profile"
							icon={<PersonIcon fontSize="large" />}
							link="/student/profile"
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={4}>
						<StudentTile
							title="Academic"
							icon={<BookIcon fontSize="large" />}
							link="/student/academic"
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={4}>
						<StudentTile
							title="Admission"
							icon={<AssignmentIcon fontSize="large" />}
							link="/student/admission"
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={4}>
						<StudentTile
							title="Placement"
							icon={<EmojiEventsIcon fontSize="large" />}
							link="/student/placement"
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={4}>
						<StudentTile
							title="Attendance"
							icon={<TodayIcon fontSize="large" />}
							link="/student/attendance"
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={4}>
						<StudentTile
							title="Parent Teacher Meeting"
							icon={<GroupIcon fontSize="large" />}
							link="/student/ptm"
						/>
					</Grid>
				</Grid>
				{/* <Tooltip title="Report Bug">
          <Fab
            color="primary"
            aria-label="report bug"
            onClick={handleBugReportDialogOpen}
            sx={{ position: "fixed", bottom: 16, right: 16 }}
          >
            <BugReportIcon />
          </Fab>
        </Tooltip>
        <BugReportDialog
          open={bugReportDialogOpen}
          onClose={handleBugReportDialogClose}
        /> */}
			</Container>
		</Page>
	);
};
export default Dashboard;

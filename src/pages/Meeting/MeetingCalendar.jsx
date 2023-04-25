import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import { formatDate } from "@fullcalendar/core";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { useState, useEffect, useRef, useCallback, useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useMeeting } from "../../hooks/useMeeting";
import { useTheme } from "@mui/material";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import api from "../../utils/axios";
import { AuthContext } from "../../context/AuthContext";

const EventList = ({ currentEvents }) => {
  return (
    <List>
      {currentEvents.map((event) => (
        <ListItem
          key={event._id}
          sx={{
            margin: "10px 0",
            borderRadius: "2px",
          }}
        >
          <ListItemText
            primary={event.title}
            secondary={
              <Typography>
                {formatDate(event.start, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

const MeetingDialog = ({
  open,
  handleClose,
  handleSave,
  titleRef,
  locationRef,
  startTime,
  endTime,
  selected,
  meetingType,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>New Event</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              label="Title"
              id="standard-size-small"
              defaultValue=""
              size="small"
              variant="standard"
              inputRef={titleRef}
            />
            <TextField
              label="Location"
              id="standard-size-small"
              defaultValue="college"
              size="small"
              variant="standard"
              inputRef={locationRef}
            />{" "}
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                label={"Starting Time"}
                views={["hours", "minutes", "seconds"]}
                inputRef={startTime}
              />
              <MobileTimePicker
                label={"Ending Time"}
                views={["hours", "minutes", "seconds"]}
                inputRef={endTime}
              />
            </LocalizationProvider>
          </div>
          <div>
            <TextField
              label="Type Of Meeting"
              id="standard-size-small"
              defaultValue=""
              size="small"
              variant="standard"
              inputRef={meetingType}
            />
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

const MeetingCalendar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selected, setSelected] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const startTime = useRef();
  const endTime = useRef();
  const titleRef = useRef();
  const locationRef = useRef();
  const meetingType = useRef();
  const userId = "6440827f7b7d9337a2202d16";
  const calendarRef = useRef(null);
  const { createMeeting } = useMeeting();
  const { user } = useContext(AuthContext);

  console.log(user);

  const getAllMeetings = useCallback(async () => {
    try {
      const response = await api.get("/meetings");
      const events = response.data.map((meeting) => ({
        id: meeting._id,
        title: meeting.title,
        start: meeting.start,
        end: meeting.end,
        allDay: meeting.allDay,
      }));
      setCurrentEvents(events);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAllMeetings();
  }, [getAllMeetings]);

  const handleDateClick = (selected) => {
    setSelected(selected);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    setOpen(false);

    const title = titleRef.current.value;
    const start = startTime.current.value;
    const end = endTime.current.value;
    const type = meetingType.current.value;
    const location = locationRef.current.value;

    const startDateTime = dayjs(
      `${selected.startStr} ${start}`,
      "YYYY-MM-DD hh:mm A"
    ).format("YYYY-MM-DDTHH:mm:ss");

    const endDateTime = dayjs(
      `${selected.startStr} ${end}`,
      "YYYY-MM-DD hh:mm A"
    ).format("YYYY-MM-DDTHH:mm:ss");

    // Check for validation
    if (!title || !start || !end || !type || !location) {
      enqueueSnackbar("Please fill in all fields", { variant: "error" });
      return;
    }

    // Send request to create meeting
    try {
      const meeting = {
        title,
        start: startDateTime,
        end: endDateTime,
        type,
        location,
      };
      const response = await createMeeting(meeting, userId);
      const calendarApi = selected.view.calendar;
      calendarApi.unselect();
      if (title) {
        calendarApi.addEvent({
          id: response.data._id,
          title,
          start: startDateTime,
          end: endDateTime,
          allDay: false,
        });
      }
      enqueueSnackbar("Meeting created successfully", { variant: "success" });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message || "Failed to create meeting", {
        variant: "error",
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={theme.palette.primary[700]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <EventList currentEvents={currentEvents} />
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            ref={calendarRef}
            events={currentEvents}
          />
        </Box>

        <MeetingDialog
          open={open}
          handleClose={handleClose}
          handleSave={handleSave}
          titleRef={titleRef}
          locationRef={locationRef}
          startTime={startTime}
          endTime={endTime}
          selected={selected}
          meetingType={meetingType}
        />
      </Box>
    </Box>
  );
};

export default MeetingCalendar;

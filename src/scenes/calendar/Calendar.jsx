import * as React from "react";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
// import Header from "../../components/Header";

const Calendar = () => {
  const theme = useTheme();
  const [currentEvents, setCurrentEvents] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = useState({});
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  // const [meetings, setMeetings] = useState([]);

  // [To Be Used after posting the meetings]
  // useEffect(() => {
  //   fetch(import.meta.env.VITE_API_URL + "/meetings") // replace with your API endpoint
  //     .then((response) => response.json())
  //     .then((data) => setCurrentEvents(data))
  //     .catch((error) => console.error(error));
  // }, []);

  const handleDateClick = (selected) => {
    setSelected(selected);
    setOpen(true);
  };

  const Close = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    const title = "Test";
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }

    //Time wise : 9:30 - 10:50 (documentation)
    //Event -> Backend log
    // Save Type of meeting
    // User claendar _> use Effect-> Events fetch

    //TASKS
    // newMeeting
    //test if post is working
    //testing if all meetings are coming or not
    //display the array of meetings on the left
    const createMeeting = async (meeting) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meeting),
      };

      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/createmeeting",
          requestOptions
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    createMeeting(newMeeting);
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
      {/* <Header title="Calendar" subtitle="Full Calendar Interactive Page" /> */}

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={theme.palette.primary[700]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: theme.palette.greenAccent[500],
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
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2023-03-19",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2022-09-28",
              },
            ]}
          />
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Event</DialogTitle>
          <DialogContent>
            {/* <TextField
          margin="dense"
          label="Size"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
        /> */}
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
                />
                <TextField
                  label="Location"
                  id="standard-size-small"
                  defaultValue="college"
                  size="small"
                  variant="standard"
                />{" "}
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["MobileTimePicker"]}
                    sx={{ minWidth: 210 }}
                  >
                    <MobileTimePicker
                      label={"Starting Time"}
                      views={["hours", "minutes", "seconds"]}
                      value={startTime}
                      onChange={(end) => {
                        setStartTime(end);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <MobileTimePicker
                      label={"Ending Time"}
                      views={["hours", "minutes", "seconds"]}
                      value={endTime}
                      onChange={(end) => {
                        setEndTime(end);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div>
                <TextField
                  label="Type Of Meeting"
                  id="standard-size-small"
                  defaultValue=""
                  size="small"
                  variant="standard"
                />
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={Close}>Cancel</Button>
            <Button onClick={handleClose}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Calendar;

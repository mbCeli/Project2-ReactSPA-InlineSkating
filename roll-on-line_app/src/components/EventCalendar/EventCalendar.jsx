import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import CloseIcon from "@mui/icons-material/Close";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";

import "./EventCalendar.css";

import { baseURL } from "../../App";

import { useState, useEffect } from "react";
import axios from "axios";

export default function EventCalendar() {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" });
  const [eventText, setEventText] = useState("");
  const [eventName, setEventName] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEventData, setNewEventData] = useState({
    id: "",
    name: "",
    date: "",
    time: "",
    text: "",
  });

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); //this create an object that returns the number of days in the month
  let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // Get the day of the week (0=Sun, 1=Mon, ..., 6=Sat)
  if (firstDayOfMonth === 0) {
    firstDayOfMonth = 6; // Adjust Sunday (0) to index 6
  } else {
    firstDayOfMonth--; // Adjust other days by subtracting 1 to align with the corrected daysOfWeek array
  }

  const preMonth = () => {
    setCurrentMonth((preMonth) => (preMonth === 0 ? 11 : preMonth - 1));
    setCurrentYear((preYear) => (currentMonth === 0 ? preYear - 1 : preYear));
  };

  const nextMonth = () => {
    setCurrentMonth((preMonth) => (preMonth === 11 ? 0 : preMonth + 1));
    setCurrentYear((preYear) => (currentMonth === 11 ? preYear + 1 : preYear));
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();

    if (clickedDate >= today || isSameDay(clickedDate, today)) {
      setSelectedDate(clickedDate);
      setShowEventPopup(true);
      setEventTime({ hours: "00", minutes: "00" });
      setEventText("");
       setEventName("");
      setEditingEvent(null);
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  //GET
  const getEvents = () => {
    axios
      .get(`${baseURL}/events`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getEvents();
  }, []);

  //POST
  const handleAddEvent = (e) => {
    e.preventDefault();

    const newEvent = { ...newEventData };

    const requestBody = {
      id: newEvent.id,
      name: (newEvent.name = eventName),
      date: (newEvent.date = `${selectedDate.getFullYear()}-${
        selectedDate.getMonth() + 1
      }-${selectedDate.getDate()}`),
      time: (newEvent.time = `${eventTime.hours.padStart(2, "0")}:${eventTime.minutes.padStart(2, "0")}`),
      text: (newEvent.text = eventText),
    };

    axios
      .post(`${baseURL}/events`, requestBody)
      .then((response) => {
        setEvents((prevEvents) => [...prevEvents, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });

    setNewEventData({
      name: "",
      date: "",
      time: "",
      text: "",
    });

    setEventText("");
    setEventTime({ hours: "00", minutes: "00" });
    setShowEventPopup(false);
  };

  //PUT
  const handleUpdateEvent = () => {

if (!editingEvent) return;

const updatedEvent = {
  id: editingEvent.id,
  name: eventName,
  date: selectedDate.toISOString().split("T")[0], // Format to 'YYYY-MM-DD'
  time: `${eventTime.hours}:${eventTime.minutes}`,
  text: eventText,
};

axios
  .put(`${baseURL}/events/${editingEvent.id}`, updatedEvent)
  .then(() => {
    const updatedEvents = events.map((event) =>
      event.id === editingEvent.id ? updatedEvent : event
    );
    updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
    setEvents(updatedEvents);

    // Reset state and close the popup
    setShowEventPopup(false);
    setEditingEvent(null);
    setEventText("");
    setEventTime({ hours: "00", minutes: "00" });
    setEventName("");
  })
  .catch((error) => {
    console.log(error);
  });
  };

const handleEditEvent = (event) => {
  // Set the editingEvent state to the selected event's data
  setEditingEvent(event);

  // Set the state of form inputs to the event's data
  setEventName(event.name);
  setEventText(event.text);
  const eventTime = event.time.split(":"); // Assuming time is stored as 'HH:mm'
  setEventTime({ hours: eventTime[0], minutes: eventTime[1] });

  // Open the event popup for editing
  setShowEventPopup(true);
};


  //DELETE
  const handleDeleteEvent = (eventId) => {
    axios
      .delete(`${baseURL}/events/${eventId}`)
      .then(() => {
        const updatedEvents = events.filter((event) => event.id !== eventId);
        setEvents(updatedEvents);
      })
      .catch((error) => {
        console.log(error); 
      })
  };

  return (
    <Stack
      sx={{
        width: "90%",
        minWidth: "90vmin",
        aspectRatio: "3 / 2",
        height: "78%",
        backgroundColor: "#254159",
        padding: "3rem",
        borderRadius: "5rem",
        border: "0.3rem solidrgb(31, 48, 63)",
        display: "flex",
        flexDirection: "row",
        columnGap: "2rem",
        margin: "2rem 2rem",
      }}
    >
      <Box
        /* className="calendar" */ sx={{
          width: "30%",
          height: "70%",
          boxShadow: 3,
          borderRadius: "7rem",
          padding: "2.5rem",
          marginTop: "3rem",
          backgroundColor: "#E3D3B9",
        }}
      >
        <Typography
          variant="h3"
          className="heading"
          sx={{
            fontSize: "clamp(1.9rem, 0.8cqi, 2rem)",
            fontFamily: "Oswald",
            color: "#8C4830",
          }}
        >
          Event Calendar
        </Typography>
        <Box
          /* className="navigate-date" */ sx={{
            display: "flex",
            alignItems: "center",
            columnGap: "1rem",
            marginTop: "0.5rem",
            marginBottom: "0.9rem",
          }}
        >
          <Typography
            variant="h5"
            className="month"
            sx={{
              fontSize: "clamp(1.5rem, 0.5cqi, 2.5rem)",
            }}
          >
            {monthsOfYear[currentMonth]}
          </Typography>
          <Typography
            variant="h5"
            className="year"
            sx={{
              fontSize: "clamp(1.5rem, 0.5cqi, 2.5rem)",
            }}
          >
            {currentYear}
          </Typography>
          <Box
            /* className="buttons" */ sx={{
              display: "flex",
              marginLeft: "auto",
            }}
          >
            <Button onClick={preMonth}>
              <Avatar
                sx={{
                  width: 25,
                  height: 25,
                  backgroundColor: "#49798C",
                  color: "#FEF9F3",
                }}
              >
                <NavigateBeforeIcon />
              </Avatar>
            </Button>
            <Button onClick={nextMonth}>
              <Avatar
                sx={{
                  width: 25,
                  height: 25,
                  backgroundColor: "#49798C",
                  color: "#FEF9F3",
                }}
              >
                <NavigateNextIcon />
              </Avatar>
            </Button>
          </Box>
        </Box>
        <Box
          /* className="weekdays" */
          sx={{
            width: "100%",
            display: "flex",
            margin: "0.5rem 0",
          }}
        >
          {daysOfWeek.map((day) => (
            <span key={day} className="weekdays">
              {day}
            </span>
          ))}
        </Box>
        <Box
          sx={{
            /* className="days" */
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
          }}
          className="calendar-days"
        >
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`} className="calendar-day">
              {" "}
            </span>
          ))}

          {[...Array(daysInMonth).keys()].map((day) => (
            <span
              key={day + 1}
              className={
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? "calendar-day current-day "
                  : "calendar-day"
              }
              onClick={() => handleDateClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </Box>
      </Box>
      <Box
        /* className="events" */ sx={{
          width: "60%",
          height: "100%",
          padding: "3rem 0",
        }}
      >
        {showEventPopup && (
          <Box
            /* className="event-popup" */
            sx={{
              position: "absolute",
              top: "37%",
              left: "5rem",
              backgroundColor: "#E3D3B9",
              width: "clamp(26rem, 21cqi, 45rem)",
              aspectRatio: "10 / 8",
              borderRadius: "2rem",
              boxShadow: "0 1rem 3rem rgba(0, 0, 0, 0.3)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              rowGap: "2rem",
              padding: "2rem",
            }}
          >
            <Box
              /* className="time-input" */
              sx={{
                display: "flex",
                columnGap: "1rem",
              }}
            >
              <Box
                className="event-popup-time"
                sx={{
                  width: "clamp(4rem, 4cqi, 7rem)",
                  backgroundColor: "#49798C",
                  color: "white",
                  fontFamily: "Oswald",
                  fontSize: "clamp(1rem, 1.2cqi, 2.2rem)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 0 1.5rem 0.2rem rgba(74, 189, 255, 0.4)",
                  letterSpacing: "0.1rem",
                }}
              >
                Time
              </Box>
              <input
                type="number"
                name="hours"
                min={0}
                max={24}
                className="hours"
                value={eventTime.hours}
                onChange={(e) =>
                  setEventTime({ ...eventTime, hours: e.target.value })
                }
              />
              <input
                type="number"
                name="minutes"
                min={0}
                max={60}
                className="minutes"
                value={eventTime.minutes}
                onChange={(e) =>
                  setEventTime({ ...eventTime, minutes: e.target.value })
                }
              />
            </Box>
            <TextField
              id="outlined-multiline-static"
              color="#103A50"
              placeholder="Event Title (Maximum 30 chracaters)"
              variant="outlined"
              focused
              value={eventName}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setEventName(e.target.value);
                }
              }}
            />
            <TextField
              id="outlined-multiline-static"
              color="#103A50"
              multiline
              rows={5}
              placeholder="Enter Event details (Maximum 100 chracaters)"
              variant="outlined"
              focused
              value={eventText}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setEventText(e.target.value);
                }
              }}
            />

            <Button
              variant="contained" /* className="event-popup-button" */
              sx={{
                width: "clamp(13rem, 13cqi, 25rem)",
                height: "3rem",
                fontFamily: "Oswald",
                fontSize: "clamp(1.3rem, 1.3cqi, 2.2rem)",
                letterSpacing: "0.1rem",
                border: "none",
                boxShadow: "0 0 1.5rem 1rem rgba(239, 144, 17, 0.2)",
                backgroundColor: "#49798C",
              }}
              onClick={editingEvent ? handleUpdateEvent : handleAddEvent} // Conditional logic to either update or add event
            >
              {editingEvent ? "Update Event" : "Add Event"}
            </Button>
            <Button
              className="close-event-popup"
              sx={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                color: "#49798C",
              }}
              onClick={() => setShowEventPopup(false)}
            >
              <CloseIcon />
            </Button>
          </Box>
        )}
        {events.map(
          (event, index) =>
            event.date && (
              <Box
                /*  className="event" */
                key={index}
                sx={{
                  width: "100%",
                  height: "7rem",
                  backgroundColor: "#FEF9F3",
                  padding: "1rem",
                  borderRadius: "2rem",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                  position: "relative",
                  columnGap: "1rem",
                }}
              >
                <Box
                  /* className="event-date-wrapper" */
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100px",
                    borderRight: "0.1rem solid #103A50",
                  }}
                >
                  <Box
                    /* className="event-date" */
                    sx={{
                      fontSize: "clamp(1rem, 0.2cqi, 0.5rem)",
                      color: "#103A50",
                      width: "100px",
                    }}
                  >
                    {`${event.date}`}
                  </Box>
                  <Box
                    /* className="event-time" */
                    sx={{
                      fontSize: "clamp(1rem, 0.2cqi, 0.5rem)",
                      color: "#103A50",
                    }}
                  >
                    {event.time}
                  </Box>
                </Box>
                <Box
                  /* className="event-name" */
                  sx={{
                    fontSize: "clamp(1rem, 0.2cqi, 0.5rem)",
                    color: "#103A50",
                    width: "130px",
                  }}
                >
                  {event.name}
                </Box>
                <Box
                  /* className="event-text" */
                  sx={{
                    fontSize: "clamp(1rem, 0.2cqi, 0.5rem)",
                    lineHeight: "2rem",
                    width: "400px",
                    padding: "0 3rem 0 1rem",
                    overflowWrap: "break-word",
                  }}
                >
                  {event.text}
                </Box>
                <Box
                  /* className="event-buttons" */
                  sx={{
                    position: "absolute",
                    top: "20%",
                    transform: "translateX(-50%)",
                    right: "0rem",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "1rem",
                  }}
                >
                  <Button
                    className="edit-event-button"
                    onClick={() => handleEditEvent(event)}
                  >
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        backgroundColor: "#8C4830",
                      }}
                    >
                      <BorderColorIcon />
                    </Avatar>
                  </Button>
                  <Button
                    className="delete-event-button"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <Avatar
                      sx={{ width: 30, height: 30, backgroundColor: "#8C4830" }}
                    >
                      <DeleteIcon />
                    </Avatar>
                  </Button>
                </Box>
              </Box>
            )
        )}
      </Box>
    </Stack>
  );
}

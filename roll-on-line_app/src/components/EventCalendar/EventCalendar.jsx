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

export default function EventCalendar() {
  return (
    <Stack
      sx={{
        width: "90%",
        minWidth: "90vmin",
        aspectRatio: "3 / 2",
        height: "70%",
        backgroundColor: "pink",
        padding: "3rem",
        borderRadius: "5rem",
        border: "0.3rem solid grey",
        display: "flex",
        flexDirection: "row",
        columnGap: "2rem",
        margin: "2rem 2rem",
      }}
    >
      <Box
        /* className="calendar" */ sx={{
          width: "30%",
          height: "60%",
          boxShadow: 3,
          borderRadius: "7rem",
          padding: "2.5rem",
        }}
      >
        <Typography
          variant="h3"
          className="heading"
          sx={{
            fontSize: "clamp(1.9rem, 0.8cqi, 2rem)",
            fontFamily: "Oswald",
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
            February,
          </Typography>
          <Typography
            variant="h5"
            className="year"
            sx={{
              fontSize: "clamp(1.5rem, 0.5cqi, 2.5rem)",
            }}
          >
            2025
          </Typography>
          <Box
            /* className="buttons" */ sx={{
              display: "flex",
              marginLeft: "auto",
            }}
          >
            <Button>
              <Avatar sx={{ width: 25, height: 25 }}>
                <NavigateBeforeIcon />
              </Avatar>
            </Button>
            <Button>
              <Avatar sx={{ width: 25, height: 25 }}>
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
          <span className="weekdays">Mon</span>
          <span className="weekdays">Tue</span>
          <span className="weekdays">Wed</span>
          <span className="weekdays">Thu</span>
          <span className="weekdays">Fri</span>
          <span className="weekdays">Sat</span>
          <span className="weekdays">Sun</span>
        </Box>
        <Box /* className="days" */
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <span className="days">1</span>
          <span className="days">2</span>
          <span className="days">3</span>
          <span className="days">4</span>
          <span className="days">5</span>
          <span className="days">6</span>
          <span className="days">7</span>
          <span className="days">8</span>
          <span className="days">9</span>
          <span className="days">10</span>
          <span className="days">11</span>
          <span className="days">12</span>
          <span className="days">13</span>
          <span className="days">14</span>
          <span className="days">15</span>
          <span className="days">16</span>
          <span className="days">17</span>
          <span className="days">18</span>
          <span className="days">19</span>
          <span className="days current-day">20</span>
          <span className="days">21</span>
          <span className="days">22</span>
          <span className="days">23</span>
          <span className="days">24</span>
          <span className="days">25</span>
          <span className="days">26</span>
          <span className="days">27</span>
          <span className="days">28</span>
          <span className="days">29</span>
          <span className="days">30</span>
          <span className="days">31</span>
        </Box>
      </Box>
      <Box
        /* className="events" */ sx={{
          width: "60%",
          height: "100%",
          padding: "3rem 0",
        }}
      >
        <Box
          /* className="event-popup" */
          sx={{
            /* display:"none", */
            position: "absolute",
            top: "39%",
            left: "5rem",
            backgroundColor: "#c97",
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
                backgroundColor: "primary.main",
                color: "white",
                fontFamily: "Oswald",
                fontSize: "clamp(1rem, 1.2cqi, 2.2rem)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 0 1.5rem 0.5rem rgba(0, 163, 255, 0.2)",
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
            />
            <input
              type="number"
              name="minutes"
              min={0}
              max={60}
              className="minutes"
            />
          </Box>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={5}
            placeholder="Enter Event details (Maximum 100 chracaters)"
            variant="outlined"
            focused
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
            }}
          >
            Add Event
          </Button>
          <Button
            className="close-event-popup"
            sx={{
              position:"absolute",
              top:"1rem",
              right:"1rem"
            }}
          >
            <CloseIcon />
          </Button>
        </Box>
        <Box
          /*  className="event" */
          sx={{
            width: "100%",
            height: "7rem",
            backgroundColor: "primary.main",
            padding: "1rem",
            borderRadius: "2rem",
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
            position: "relative",
            columnGap:"2rem"
          }}
        >
          <Box
            /* className="event-date-wrapper" */
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "25%",
              borderRight: "0.1rem solid rgba(255, 255, 255, 0.5)",
            }}
          >
            <Box
              /* className="event-date" */
              sx={{
                fontSize: "clamp(0.8rem, 0.2cqi, 0.5rem)",
                color: "white",
              }}
            >
              February 20, 2025
            </Box>
            <Box
              /* className="event-time" */
              sx={{
                fontSize: "clamp(1rem, 0.2cqi, 0.5rem)",
                color: "white",
              }}
            >
              10:00
            </Box>
          </Box>
          <Box
            /* className="event-text" */
            sx={{
              fontSize: "clamp(1rem, 0.2cqi, 0.5rem)",
              lineHeight: "2rem",
              width: "75%",
              padding: "0 3rem 0 1rem",
              overflowWrap: "break-word",
            }}
          >
            Meeting with John
          </Box>
          <Box
            /* className="event-buttons" */
            sx={{
              position: "absolute",
              top: "20%",
              transform: "translateX(-50%)",
              right: "0.1rem",
              display: "flex",
              flexDirection: "column",
              rowGap: "1rem",
            }}
          >
            <Button className="edit-event-button">
              <Avatar sx={{ width: 30, height: 30 }}>
                <BorderColorIcon />
              </Avatar>
            </Button>
            <Button className="delete-event-button">
              <Avatar sx={{ width: 30, height: 30 }}>
                <DeleteIcon />
              </Avatar>
            </Button>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}

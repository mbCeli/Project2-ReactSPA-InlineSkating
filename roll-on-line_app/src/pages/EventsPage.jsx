import { Box, Stack } from "@mui/material";

import EventCalendar from "../components/EventCalendar/EventCalendar";

export default function EventsPage() {
  return (
    <Stack
      sx={{
        marginTop: "9.2vh",
        border: "2px solid red",
        width: "90vw",
        height: "90vh",
      }}
    >
      <Box sx={{ height: "100%" }}>
        <EventCalendar />
      </Box>
    </Stack>
  );
}

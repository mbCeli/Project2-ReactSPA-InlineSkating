import { Box, Link, Stack, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import { Link as RouterLink } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Stack
      sx={{
        marginTop: "9.2vh",
        border: "2px solid red",
        width: "90vw",
        height: "90vh",
      }}
    >
      <Box
        sx={{
          fontSize: "2rem",
          fontWeight: "bold",
          paddingTop: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          width: "100%",
          height: "100%",
        }}
      >
        <Typography variant="h1" sx={{ color: "darkred", fontSize: "7rem" }}>404 Error</Typography>
        <Typography variant="h3">Page not found</Typography>
        <SentimentVeryDissatisfiedIcon
          sx={{ fontSize: 100, marginTop: "3rem" }}
        />
        <Typography variant="h5">Woops. Looks like the page you're looking for doesn't exist </Typography>
        <Link component={RouterLink} to="/" variant="contained">
          Go Home
        </Link>
      </Box>
    </Stack>
  );
}

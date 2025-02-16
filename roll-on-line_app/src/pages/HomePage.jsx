import { Box, Grid2 } from "@mui/material";

export default function HomePage() {
  return (
    <Box
      aria-label="home-page"
      sx={{
        display: "flex",
        border: "2px solid red",
        width: "89vw",
        height: "92vh",
        marginTop: "7.2vh",
      }}
    >
      <Box
        aria-label="left-side"
        sx={{
          marginLeft: "1vw",
          marginRight: "2vw",
          marginTop: "1vh",
          backgroundColor: "secondary.light",
          width: "35vw",
          height: "90vh",
        }}
      >
        sdf
      </Box>

      <Box
        aria-label="right-side"
        sx={{
          marginRight: "1vw",
          marginLeft: "2vw",
          marginTop: "1vh",
          backgroundColor: "primary.light",
          width: "50vw",
          height: "90vh",
        }}
      >
        <Grid2 container spacing={4} columns={12}>
          <Grid2 size={6} m={1}>sad</Grid2>
          <Grid2 size={6} m={1}>sad</Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}

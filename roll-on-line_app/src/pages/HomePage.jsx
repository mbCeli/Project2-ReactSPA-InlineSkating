import { Stack, Box, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";

import axios from "axios";

import { baseURL } from "../App";

export default function HomePage() {
  const [profile, setProfile] = useState({});

  const getProfile = () => {
    axios
      .get(`${baseURL}/profile`)
      .then((response) => setProfile(response.data))
      .catch((error) => console.log(error));
  };
  //console.log(profile);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Stack
      aria-label="home-page"
      sx={{
        display: "flex",
        flexDirection: "row",
        border: "2px solid red",
        width: "86.5vw",
        height: "90vh",
        marginTop: "9.2vh",
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
          height: "88vh",
        }}
      >
        <Grid2 container spacing={4} columns={12}>
          <Grid2 size={6} m={1}>
            {profile.name}
          </Grid2>
          <Grid2 size={6} m={1}>
            sad
          </Grid2>
        </Grid2>
      </Box>

      <Box
        aria-label="right-side"
        sx={{
          marginRight: "1vw",
          marginTop: "1vh",
          backgroundColor: "primary.light",
          width: "50vw",
          height: "88vh",
        }}
      >
        <Grid2 container spacing={4} columns={12}>
          <Grid2 size={6} m={1}>
            sad
          </Grid2>
          <Grid2 size={6} m={1}>
            sad
          </Grid2>
        </Grid2>
      </Box>
    </Stack>
  );
}

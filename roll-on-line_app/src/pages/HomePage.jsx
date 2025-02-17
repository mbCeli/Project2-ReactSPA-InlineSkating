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
      {/* Profile Dashboard */}
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
        {/* Personal Info */}
        <Grid2
          container
          spacing={4}
          columns={12}
          sx={{
            marginTop: "8vh",

            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Grid2 size={12} m={1} sx={{ textAlign: "center" }}>
            <img src={profile.image} alt="user picture" />
          </Grid2>
          <Grid2 size={12} m={1} component="h3" sx={{ textAlign: "center" }}>
            {profile.name}
          </Grid2>
          <Grid2 size={3} m={1} sx={{ textAlign: "center" }}>
            {profile.age}
          </Grid2>
          <Grid2 size={3} m={1} sx={{ textAlign: "center" }}>
            {profile.location}
          </Grid2>
          <Grid2 size={3} m={1} sx={{ textAlign: "center" }}>
            {profile.skating_since}
          </Grid2>

          {/* Equipment */}
          <Grid2
            container
            size={12}
            spacing={1}
            m={1}
            sx={{ textAlign: "center", justifyContent: "center" }}
          >
            <Grid2 size={12} m={2} component="h3">
              My Equipment
            </Grid2>
            <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12 }}>
              <span style={{ fontWeight: "bold" }}>Skates </span>
              <br />
              {profile?.skates?.name}
              <br />
              Type - {profile?.skates?.type}
              <br />
              <img src={profile?.skates?.image} alt="skates pictures" />
            </Grid2>
            <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12 }}>
              <span style={{ fontWeight: "bold" }}>Helmet </span>
              <br />
              {profile?.helmet?.name}
              <br />
              Model - {profile?.helmet?.model}
              <br />
              <img src={profile?.helmet?.image} alt="helmet pictures" />
            </Grid2>
            <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12 }}>
              <span style={{ fontWeight: "bold" }}>Knee Pads</span>
              <br />
              {profile?.knee_pads?.name}
              <br />
              Model - {profile?.knee_pads?.model}
              <br />
              <img src={profile?.knee_pads?.image} alt="knee_pads pictures" />
            </Grid2>
            <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12 }}>
              <span style={{ fontWeight: "bold" }}>Wrist Guards</span>
              <br />
              {profile?.wrist_protectors?.name}
              <br />
              Model - {profile?.wrist_protectors?.model}
              <br />
              <img
                src={profile?.wrist_protectors?.image}
                alt="wrist_protectors pictures"
              />
            </Grid2>
          </Grid2>
        </Grid2>

        {/* Stats */}
        <Grid2
          container
          size={12}
          spacing={1}
          m={1}
          sx={{ textAlign: "center", justifyContent: "center" }}
        >
          <Grid2 size={12} m={2} component="h3">
            So Far
          </Grid2>
          <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12 }}>
            <span style={{ fontWeight: "bold" }}>Weekly</span>
            <br />
            Distance - {profile?.skating_stats?.weekly_distance} m
            <br />
            Sessions - {profile?.skating_stats?.weekly_sessions}
            <br />
            Time - {profile?.skating_stats?.weekly_time} min
            <br />
            Calories - {profile?.skating_stats?.weekly_calories}
          </Grid2>
          <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12 }}>
            <span style={{ fontWeight: "bold" }}>Monthly</span>
            <br />
            Distance - {profile?.skating_stats?.monthly_distance} m
            <br />
            Sessions - {profile?.skating_stats?.monthly_sessions}
            <br />
            Time - {profile?.skating_stats?.monthly_time} min
            <br />
            Calories - {profile?.skating_stats?.monthly_calories}
          </Grid2>
          <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12 }}>
            <span style={{ fontWeight: "bold" }}>Yearly Goals</span>
            <br />
            Distance - {profile?.skating_goals?.yearly_distance_goal} m
            <br />
            Sessions - {profile?.skating_goals?.yearly_sessions_goal}
            <br />
            Time - {profile?.skating_goals?.yearly_time_goal} min
            <br />
            Calories - {profile?.skating_goals?.yearly_calories_goal}
          </Grid2>
        </Grid2>
      </Box>

      <Stack
        aria-label="right-side"
        spacing={3}
        sx={{
          marginRight: "1vw",
          marginTop: "1vh",
          width: "50vw",
          height: "88vh",
        }}
      >
        <Stack
          sx={{
            width: "50vw",
            height: "44vh",
            backgroundColor: "primary.light",
          }}
        >
          <Box></Box>
          <Box></Box>
          <Box></Box>
        </Stack>
        <Box
          sx={{
            width: "50vw",
            height: "44vh",
            backgroundColor: "primary.light",
          }}
        ></Box>
      </Stack>
    </Stack>
  );
}

import { Box, Grid2 } from "@mui/material";

import { useEffect, useState } from "react";

import axios from "axios";

import { baseURL } from "../../App";
import "./ProfileDashBoard.css";
import cover from "../../../public/assets/images/c1e54c33581e520e3346e503c67c4678.jpg";



export default function ProfileDashboard() {
  const [profile, setProfile] = useState({});
  const [stats, setStats] = useState({});
  const [goals, setGoals] = useState({});
  const [equipment, setEquipment] = useState({});

  //get profile info (GET)
  const getProfile = () => {
    axios
      .get(`${baseURL}/profile`)
      .then((response) => setProfile(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProfile();
  }, []);

  //get stats info (GET)
  const getStats = () => {
    axios
      .get(`${baseURL}/skating_stats`)
      .then((response) => setStats(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getStats();
  }, []);

  //get goals info (GET)
  const getGoals = () => {
    axios
      .get(`${baseURL}/skating_goals`)
      .then((response) => setGoals(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getGoals();
  }, []);

  //get equipment info (GET)
  const getEquipment = () => {
    axios
      .get(`${baseURL}/equipment`)
      .then((response) => setEquipment(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getEquipment();
  }, []);

  return (
    <Box
    className="profile-dashboard"
      aria-label="left-side"
      borderRadius={15}
      sx={{
        marginLeft: "1vw",
        marginRight: "2vw",
        marginTop: "2vh",
        width: "35vw",
        height: "85vh",
        backgroundImage: `url(${cover})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        boxShadow:
          "0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      {/* Personal Info */}
      <Grid2
        container
        spacing={0.5}
        columns={12}
        sx={{
          marginTop: "3vh",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Grid2 size={12} m={1} sx={{ textAlign: "center" }}>
          <img
            src={profile.image}
            alt="user picture"
            className="profile-image"
          />
        </Grid2>
        <Grid2
          size={12}
          m={1}
          component="h3"
          sx={{
            textAlign: "center",
            backgroundColor: "#D9C8B4",
            opacity: 0.7,
            borderRadius: "12px",
          }}
        >
          {profile.name}
        </Grid2>
        <Grid2
          size={3}
          m={1}
          sx={{
            textAlign: "center",
            backgroundColor: "#D9C8B4",
            opacity: 0.7,
            borderRadius: "12px",
          }}
        >
          {profile.age}
        </Grid2>
        <Grid2
          size={3}
          m={1}
          sx={{
            textAlign: "center",
            backgroundColor: "#D9C8B4",
            opacity: 0.7,
            borderRadius: "12px",
          }}
        >
          {profile.location}
        </Grid2>
        <Grid2
          size={3}
          m={1}
          sx={{
            textAlign: "center",
            backgroundColor: "#D9C8B4",
            opacity: 0.7,
            borderRadius: "12px",
          }}
        >
          {profile.skating_since}
        </Grid2>

        {/* Equipment */}
        <Grid2
          container
          size={12}
          spacing={0.5}
          m={1}
          sx={{ textAlign: "center", justifyContent: "center" }}
        >
          <Grid2
            size={12}
            m={2}
            component="h3"
            sx={{
              textAlign: "center",
              backgroundColor: "#D9C8B4",
              opacity: 0.7,
              borderRadius: "12px",
            }}
          >
            My Equipment
          </Grid2>
          <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12,  }}>
            <span style={{ fontWeight: "bold" }}>Skates </span>
            <br />
            {equipment?.skates?.name}
            <br />
            Type - {equipment?.skates?.type}
            <br />
            <img
              src={equipment?.skates?.image}
              alt="skates pictures"
              className="skates-image"
            />
          </Grid2>
          <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12 }}>
            <span style={{ fontWeight: "bold" }}>Helmet </span>
            <br />
            {equipment?.helmet?.name}
            <br />
            Model - {equipment?.helmet?.model}
            <br />
            <img
              src={equipment?.helmet?.image}
              alt="helmet pictures"
              className="helmet-image"
            />
          </Grid2>
          <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12 }}>
            <span style={{ fontWeight: "bold" }}>Knee Pads</span>
            <br />
            {equipment?.knee_pads?.name}
            <br />
            Model - {equipment?.knee_pads?.model}
            <br />
            <img
              src={equipment?.knee_pads?.image}
              alt="knee_pads pictures"
              className="knee-pads-image"
            />
          </Grid2>
          <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12 }}>
            <span style={{ fontWeight: "bold" }}>Wrist Guards</span>
            <br />
            {equipment?.wrist_protectors?.name}
            <br />
            Model - {equipment?.wrist_protectors?.model}
            <br />
            <img
              src={equipment?.wrist_protectors?.image}
              alt="wrist_protectors pictures"
              className="wrist-guards-image"
            />
          </Grid2>
        </Grid2>
      </Grid2>

      {/* Stats */}
      <Grid2
        container
        size={12}
        spacing={0.5}
        m={1}
        sx={{ textAlign: "center", justifyContent: "center", color: "#254159" }}
      >
        <Grid2
          size={12}
          m={2}
          component="h3"
          sx={{
            textAlign: "center",
            backgroundColor: "#D9C8B4",
            opacity: 0.7,
            borderRadius: "12px",
          }}
        >
          So Far
        </Grid2>
        <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12 }}>
          <span style={{ fontWeight: "bold" }}>Weekly</span>
          <br />
          Distance - {stats.weekly_distance} m
          <br />
          Sessions - {stats.weekly_sessions}
          <br />
          Time - {stats.weekly_time} min
          <br />
          Calories - {stats.weekly_calories}
        </Grid2>
        <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12 }}>
          <span style={{ fontWeight: "bold" }}>Monthly</span>
          <br />
          Distance - {stats.monthly_distance} m
          <br />
          Sessions - {stats.monthly_sessions}
          <br />
          Time - {stats.monthly_time} min
          <br />
          Calories - {stats.monthly_calories}
        </Grid2>
        <Grid2 size={3} sx={{ textAlign: "center", fontSize: 12 }}>
          <span style={{ fontWeight: "bold" }}>Yearly Goals</span>
          <br />
          Distance - {goals.yearly_distance_goal} m
          <br />
          Sessions - {goals.yearly_sessions_goal}
          <br />
          Time - {goals.yearly_time_goal} min
          <br />
          Calories - {goals.yearly_calories_goal}
        </Grid2>
      </Grid2>
    </Box>
  );
}

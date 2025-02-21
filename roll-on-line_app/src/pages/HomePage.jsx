import { Stack } from "@mui/material";

import ProfileDashboard from "../components/Profile/ProfileDashboard";
import ChallengesCarousel from "../components/Challenges/ChallengesCarousel";
import RecentActivities from "../components/Activities/RecentActivities";



export default function HomePage() {
  return (
    <Stack
      aria-label="home-page"
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "90vw",
        height: "90vh",
        marginTop: "9.2vh",
      }}
    >
      <Stack
        aria-label="left-side"
        sx={{
          marginLeft: "0.5vw",
        }}
      >
        {/* Profile Dashboard */}
        <ProfileDashboard />
      </Stack>

      <Stack
        aria-label="right-side"
        sx={{
          marginLeft: "1vw",
        }}
      >
        {/* Challenges Carousel */}
        <ChallengesCarousel />

        {/* Recent Activity */}
        <RecentActivities />
      </Stack>
    </Stack>
  );
}

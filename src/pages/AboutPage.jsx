import { Box, Link, Stack, Typography } from "@mui/material";

import linkedInLogo from "../../../public/assets/images/LI-Logo.png";
import gitHubLogo from "../../../public/assets/images/github-mark.png";

import gifURL from "../../../public/assets/images/pretty-cute.gif";

export default function AboutPage() {
  return (
    <Stack
      sx={{
        width: "90vw",
        height: "85vh",
        marginTop: "12vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        variant="h1"
        sx={{
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "#254159",
        }}
      >
        RollOnLine
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography sx={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          The app created for you to track your skating progress and challenges.
        </Typography>
        <Typography
          sx={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#FECC97" }}
        >
          Keep on skating, keep on rolling!
        </Typography>
        <Box>
          <img src={gifURL} alt="skating gif" />
        </Box>
      </Box>

      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "flex-end",
          paddingTop: "4rem",
        }}
      >
        <Typography variant="h5">Celina Mun Bapori</Typography>
        <Link
          href="https://github.com/mbCeli"
          target="_blank"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img className="github-logo" src={gitHubLogo} alt="github logo" />
          <Typography sx={{ fontSize: "1rem", color: "black" }}>
            {" "}
            GitHub
          </Typography>
        </Link>
        <Link
          href="https://www.linkedin.com/in/celina-mun-bapori/"
          target="_blank"
        >
          <img
            className="linkedin-logo"
            src={linkedInLogo}
            alt="linkedin logo"
          />
        </Link>
      </Box>
    </Stack>
  );
}

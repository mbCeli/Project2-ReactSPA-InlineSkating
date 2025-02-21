import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TodayIcon from "@mui/icons-material/Today";
import InfoIcon from "@mui/icons-material/Info";
import GitHubIcon from "@mui/icons-material/GitHub";

import { Link as RouterLink } from "react-router-dom";

import RollOnLineIcon from "../../../public/assets/images/reshot-icon-roller-skate-2S9UAGYNPW.svg";


export default function ClippedDrawer() {
  //Links to the respective pages

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          flexDirection: "row-reverse",
          backgroundColor: "#49798C",
        }}
        elevation={0}
      >
        <Toolbar>
          <Box
            sx={{
              backgroundImage: `url(${RollOnLineIcon})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              width: 40,
              height: 40,
              marginRight: "1rem",
              color: "white",
            }}
          ></Box>
          <Typography variant="h6" component="div">
            RollOnLine
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer /* This is my sidebar */
        variant="permanent"
        anchor="right"
        sx={{
          display: { xs: "none", md: "flex" },
          "& .MuiDrawer-paper": {
            width: 185,
            backgroundColor: "#49798C",
          },
        }}
        elevation={0}
      >
        <Toolbar disableGutters sx={{ width: 165 }}>
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: 10,
              width: 165,
            }}
          >
            <ListItem sx={{ marginBottom: 4, width: 165 }}>
              <Link component={RouterLink} to="/">
                <ListItemButton sx={{ width: 165 }}>
                  <ListItemIcon>
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: "#F2C094" }}>
                        <HomeIcon />
                      </Avatar>
                    </ListItemAvatar>
                  </ListItemIcon>
                  <Typography variant="body1" sx={{ color: "white" }}>
                    Home
                  </Typography>
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem sx={{ marginBottom: 4, width: 165 }}>
              <Link component={RouterLink} to="/events">
                <ListItemButton sx={{ width: 165 }}>
                  <ListItemIcon>
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: "#F2C094" }}>
                        <TodayIcon />
                      </Avatar>
                    </ListItemAvatar>
                  </ListItemIcon>
                  <Typography variant="body1" sx={{ color: "white" }}>
                    Events
                  </Typography>
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem sx={{ marginBottom: 4, width: 165 }}>
              <Link component={RouterLink} to="/about">
                <ListItemButton sx={{ width: 165 }}>
                  <ListItemIcon>
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: "#F2C094" }}>
                        <InfoIcon />
                      </Avatar>
                    </ListItemAvatar>
                  </ListItemIcon>
                  <Typography variant="body1" sx={{ color: "white" }}>
                    About
                  </Typography>
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem sx={{ width: 165, marginTop: "23rem" }}>
              <ListItemButton sx={{ width: 165 }}>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: "#F2C094" }}>
                      <GitHubIcon />
                    </Avatar>
                  </ListItemAvatar>
                </ListItemIcon>
                <Link
                  href="https://github.com/mbCeli/Project2-ReactSPA-InlineSkating"
                  target="_blank"
                  variant="body1"
                  sx={{ color: "white" }}
                >
                  Git Repository
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
        </Toolbar>
      </Drawer>
    </Box>
  );
}

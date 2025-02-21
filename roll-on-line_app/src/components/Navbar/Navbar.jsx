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
  SvgIcon,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import { Link as RouterLink } from "react-router-dom";

import RollOnLineIcon from "../../assets/images/reshot-icon-roller-skate-2S9UAGYNPW.svg";

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
          <SvgIcon>
            <img src={RollOnLineIcon} />
          </SvgIcon>
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
                      <Avatar>
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
                      <Avatar>
                        <HomeIcon />
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
              <Link component={RouterLink} to="/skate_info">
                <ListItemButton sx={{ width: 165 }}>
                  <ListItemIcon>
                    <ListItemAvatar>
                      <Avatar>
                        <HomeIcon />
                      </Avatar>
                    </ListItemAvatar>
                  </ListItemIcon>
                  <Typography variant="body1" sx={{ color: "white" }}>
                    History
                  </Typography>
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem sx={{ marginBottom: 4, width: 165 }}>
              <Link component={RouterLink} to="/about">
                <ListItemButton sx={{ width: 165 }}>
                  <ListItemIcon>
                    <ListItemAvatar>
                      <Avatar>
                        <HomeIcon />
                      </Avatar>
                    </ListItemAvatar>
                  </ListItemIcon>
                  <Typography variant="body1" sx={{ color: "white" }}>
                    About
                  </Typography>
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem sx={{ width: 165 }}>
              <ListItemButton sx={{ width: 165 }}>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar>
                      <HomeIcon />
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

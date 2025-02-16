import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
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

import RollOnLineIcon from "../assets/images/reshot-icon-roller-skate-2S9UAGYNPW.svg";

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
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          display: { xs: "none", md: "flex" },
          "& .MuiDrawer-paper": {
            width: 150,
            boxSizing: "border-box",
            border: "none",
            backgroundColor: "primary.main",
          },
        }}
      >
        <Toolbar disableGutters>
          <List sx={{ marginTop: 10 }}>
            <ListItem sx={{ marginBottom: 4 }} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar>
                      <HomeIcon />
                    </Avatar>
                  </ListItemAvatar>
                </ListItemIcon>
                Home
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ marginBottom: 4 }} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar>
                      <HomeIcon />
                    </Avatar>
                  </ListItemAvatar>
                </ListItemIcon>
                Events
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ marginBottom: 4 }} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar>
                      <HomeIcon />
                    </Avatar>
                  </ListItemAvatar>
                </ListItemIcon>
                History
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ marginBottom: 50 }} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar>
                      <HomeIcon />
                    </Avatar>
                  </ListItemAvatar>
                </ListItemIcon>
                About
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar>
                      <HomeIcon />
                    </Avatar>
                  </ListItemAvatar>
                </ListItemIcon>
                Github Repository
              </ListItemButton>
            </ListItem>
          </List>
        </Toolbar>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box>
    </Box>
  );
}

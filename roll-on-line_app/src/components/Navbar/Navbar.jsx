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
            boxSizing: "border-box",
            border: "1px solid black",
            backgroundColor: "primary.main",
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
              <ListItemButton sx={{ width: 165 }}>
                <Link component={RouterLink} to="/">
                  <ListItemIcon>
                    <ListItemAvatar>
                      <Avatar>
                        <HomeIcon />
                      </Avatar>
                    </ListItemAvatar>
                  </ListItemIcon>
                </Link>
                Home
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ marginBottom: 4, width: 165 }}>
              <ListItemButton sx={{ width: 165 }}>
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
            <ListItem sx={{ marginBottom: 4, width: 165 }}>
              <ListItemButton sx={{ width: 165 }}>
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
            <ListItem sx={{ marginBottom: 16, width: 165 }}>
              <ListItemButton sx={{ width: 165 }}>
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
            <ListItem sx={{ width: 165 }}>
              <ListItemButton sx={{ width: 165 }}>
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
    </Box>
  );
}

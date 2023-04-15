import { useState, useEffect } from "react";

// import { purple } from "@mui/material/colors'";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import Scrollbar from "../../components/Scrollbar";

import logo from "../../public/logo.png";

import {
  Box,
  Divider,
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlinedIcon />,
    link: "/",
  },
  {
    text: "Meetings",
    icon: <EventOutlinedIcon />,
    link: "/meetings",
  },
  {
    text: "Chat",
    icon: <ChatOutlinedIcon />,
    link: "/chat",
  },
  {
    text: "Users",
    icon: <AccountCircleOutlined />,
    link: "/users",
  },
  {
    text: "Info Bot",
    icon: <InfoOutlinedIcon />,
    link: "/info-bot",
  },
];

const LoggedInUserAvatar = ({ name, role, theme }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      bgcolor={
        theme.palette.mode === "light"
          ? theme.palette.background.default
          : "rgba(145, 158, 171, 0.12)"
      }
      p={2}
      boxShadow={
        theme.palette.mode === "light" ? "0 0 6px rgba(0, 0, 0, 0.1)" : "none"
      }
      borderRadius={1}
      width="100%"
      m={2}
    >
      <Avatar
        sx={{ bgcolor: theme.palette.secondary.main, width: 48, height: 48 }}
      />
      <Box>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ color: theme.palette.text.primary }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          {role}
        </Typography>
      </Box>
    </Box>
  );
};

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation(); //keep track of url path
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");
  const theme = useTheme();

  const navButtonBackgrounColor =
    theme.palette.mode === "dark" ? "#37404a" : "#e9eaeb";

  useEffect(() => {
    if (pathname === "/") {
      setActive("dashboard");
    } else {
      setActive(pathname.substring(1));
    }
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            flexShrink: 0,
            width: drawerWidth,
            boxShadow:
              theme.palette.mode === "light"
                ? "0 0 6px rgba(0, 0, 0, 0.1)"
                : "none",
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              borderRight: "1px dashed rgba(145, 158, 171, 0.2)",
              boxShadow:
                theme.palette.mode === "light"
                  ? "0 0 6px rgba(0, 0, 0, 0.1)"
                  : "none",
            },
          }}
        >
          {/* <Scrollbar> */}

          <Box display="flex" alignSelf="center">
            <img
              src={logo}
              alt="CMRIT Logo"
              width="100"
              style={{
                transform: "scale(2)",
                filter:
                  theme.palette.mode === "dark"
                    ? "invert(100%) hue-rotate(180deg)"
                    : "none",
              }}
            />
          </Box>

          <FlexBetween color={theme.palette.secondary.main}>
            <LoggedInUserAvatar name="Sachin" role="admin" theme={theme} />

            {!isNonMobile && (
              <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <ChevronLeft />
              </IconButton>
            )}
          </FlexBetween>

          <List>
            {navItems.map(({ text, icon, link }) => {
              if (!icon) {
                return (
                  <Typography
                    sx={{
                      fontSize: "1.1rem", // Increase font size
                      fontWeight: theme.typography.body1.fontWeight,
                      color: theme.palette.text,
                    }}
                  >
                    {text}
                  </Typography>
                );
              }

              const lcText = text.toLowerCase();
              return (
                <ListItem
                  key={text}
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <ListItemButton
                    onClick={() => {
                      navigate(link);
                      setActive(lcText);
                    }}
                    sx={{
                      borderRadius: "8px",
                      backgroundColor:
                        active === lcText
                          ? navButtonBackgrounColor
                          : "transparent",
                      color:
                        active === lcText
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[200],
                      "&:hover": {
                        backgroundColor: theme.palette.secondary[400],
                        color: theme.palette.primary[600],
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "1rem",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontSize: "0.9rem",
                            fontWeight: theme.typography.body2.fontWeight,
                            color: theme.palette.text,
                          }}
                        >
                          {text}
                        </Typography>
                      }
                    />
                    {active === lcText && (
                      <ChevronRightOutlined sx={{ ml: "auto" }} />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          {/* </Scrollbar> */}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;

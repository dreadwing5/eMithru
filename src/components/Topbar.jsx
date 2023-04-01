import { useContext, createRef, useEffect } from "react";
// import { useMode } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
  NotificationsOutlined,
  PersonOutlined,
  LogoutOutlined,
} from "@mui/icons-material";

import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";

import FlexBetween from "./FlexBetween";

import { AuthContext } from "../context/AuthContext";
import useSettings from "../hooks/useSettings";

const Topbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();
  const { onToggleMode } = useSettings();

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClick = () => {
    onToggleMode.toggleThemeMode();
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}

        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}

        <FlexBetween gap="1.5rem">
          <IconButton onClick={handleLogout}>
            <LogoutOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton onClick={handleClick}>
            {theme.palette.mode === "light" ? (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <NotificationsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton>
            <PersonOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;

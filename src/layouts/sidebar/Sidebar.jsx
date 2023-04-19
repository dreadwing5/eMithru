import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavConfig from "./NavConfig";
import SidebarDrawer from "./SidebarDrawer";
import UserAvatar from "./UserAvatar";
import NavItemsList from "./NavItemsList";
import FlexBetween from "../../components/FlexBetween";
import Scrollbar from "../../components/Scrollbar";
import logo from "../../public/logo.png";
import { Box, IconButton, useTheme } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation(); //keep track of url path

  const [active, setActive] = useState("dashboard");
  const theme = useTheme();

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
        <SidebarDrawer
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          drawerWidth={drawerWidth}
        >
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
            <UserAvatar name="Sachin" role="admin" theme={theme} />

            {!isNonMobile && (
              <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <ChevronLeft />
              </IconButton>
            )}
          </FlexBetween>

          <NavItemsList
            navConfig={NavConfig}
            active={active}
            setActive={setActive}
          />
        </SidebarDrawer>
      )}
    </Box>
  );
};

export default Sidebar;

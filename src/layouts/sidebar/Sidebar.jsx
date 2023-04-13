import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import Scrollbar from "../../components/Scrollbar";
import {
  Box,
  Divider,
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
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Profile",
    icon: null,
  },
  {
    text: "View",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Update",
    icon: <Groups2Outlined />,
  },
  {
    text: "Meetings",
    icon: null,
  },
  {
    text: "Schedule Meetings",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Upcoming Meeting",
    icon: <TodayOutlined />,
  },
  {
    text: "Conversation",
    icon: null,
  },
  {
    text: "Private Conversation",
    icon: <TodayOutlined />,
  },
  {
    text: "ChatBot",
    icon: <TodayOutlined />,
  },

  {
    text: "Attendance",
    icon: null,
  },
  {
    text: "View Attendance",
    icon: <TodayOutlined />,
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation(); //keep track of url path
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
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
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
        >
          <Scrollbar>
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    CMRIT
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>

            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ m: "2.25rem 0 1rem 3rem", fontSize: "0.9rem" }}
                    >
                      {text}
                    </Typography>
                  );
                }

                const lcText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[400]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
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
                              fontSize: theme.typography.body2.fontSize,
                              fontWeight: theme.typography.body2.fontWeight,
                              color: theme.palette.text,
                            }}
                          >
                            {text}
                          </Typography>
                        }
                      />{" "}
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Scrollbar>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;

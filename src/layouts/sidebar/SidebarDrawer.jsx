import { Box, Drawer, useTheme } from "@mui/material";

const SidebarDrawer = ({
  isSidebarOpen,
  setIsSidebarOpen,
  drawerWidth,
  children,
}) => {
  const theme = useTheme();

  return (
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
      {children}
    </Drawer>
  );
};

export default SidebarDrawer;

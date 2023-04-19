import { Avatar, Box, Typography } from "@mui/material";
const UserAvatar = ({ name, role, theme }) => {
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

export default UserAvatar;

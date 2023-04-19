import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import CollapsibleIcon from "./CollapsibleIcon";

const NavItemButton = ({
  text,
  icon,
  lcText,
  theme,
  active,
  navButtonBackgroundColor,
  isDropdown,
  onToggleDropdown,
}) => {
  return (
    <ListItemButton
      onClick={onToggleDropdown}
      sx={{
        borderRadius: "8px",
        backgroundColor:
          active === lcText ? navButtonBackgroundColor : "transparent",
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
      {isDropdown && (
        <CollapsibleIcon
          isOpen={active === lcText}
          onClick={onToggleDropdown}
        />
      )}
    </ListItemButton>
  );
};

export default NavItemButton;

import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  ListItemIcon,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const DropdownItem = ({ itemText, itemLink, icon, active, setActive }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <ListItem key={itemText} sx={{ textAlign: "center" }}>
      <ListItemButton
        onClick={() => {
          navigate(itemLink);
        }}
        sx={{
          borderRadius: "8px",
          gap: 2,
          backgroundColor: "transparent",
          color: theme.palette.secondary[200],
          "&:hover": {
            backgroundColor: theme.palette.secondary[400],
            color: theme.palette.primary[600],
          },
          "& .MuiListItemIcon-root": {
            minWidth: 0,
          },
        }}
      >
        <ListItemIcon>
          <FiberManualRecordIcon
            sx={{
              color:
                active === itemText.toLowerCase()
                  ? theme.palette.primary[600]
                  : "inherit",
              width: active === itemText.toLowerCase() ? "0.8rem" : "0.5rem",
            }}
          />
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
              {itemText}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default DropdownItem;

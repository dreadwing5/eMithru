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
    <ListItem key={itemText}>
      <ListItemButton
        onClick={() => {
          navigate(itemLink);
        }}
        sx={{
          borderRadius: "8px",
          backgroundColor: "transparent",
          color: theme.palette.secondary[200],
          "&:hover": {
            backgroundColor: theme.palette.secondary[400],
            color: theme.palette.primary[600],
          },
          "& .MuiListItemIcon-root": {
            minWidth: 0,
            marginRight: theme.spacing(1),
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
          inset
          primary={
            <Typography
              sx={{
                fontSize: "0.8rem",
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

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import CollapseButton from "./CollapseButton";
import NavConfig from "./NavConfig";
import { useNavigate } from "react-router-dom";

const NavigationItem = ({
  text,
  icon,
  link,
  dropdownItems,
  active,
  setActive,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const lcText = text.toLowerCase();
  const isDropdown = dropdownItems && dropdownItems.length > 0;
  const navButtonBackgroundColor =
    theme.palette.mode === "dark" ? "#37404a" : "#e9eaeb";

  return (
    <ListItem
      key={text}
      sx={{
        textAlign: "center",
      }}
    >
      {isDropdown ? (
        <ListItemButton
          onClick={() => {
            setActive(lcText);
          }}
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
          <CollapseButton active={active} lcText={lcText} />
        </ListItemButton>
      ) : (
        <ListItemButton
          onClick={() => {
            navigate(link);
            setActive(lcText);
          }}
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
          <CollapseButton active={active} lcText={lcText} />
        </ListItemButton>
      )}
      {isDropdown &&
        active === lcText &&
        dropdownItems.map(({ text: itemText, link: itemLink }) => (
          <ListItem
            key={itemText}
            sx={{
              textAlign: "center",
            }}
          >
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
              }}
            >
              <ListItemText
                inset
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
        ))}
    </ListItem>
  );
};

export default NavigationItem;

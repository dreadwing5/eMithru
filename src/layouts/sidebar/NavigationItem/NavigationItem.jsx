import { ListItem, Box, List, useTheme } from "@mui/material";
import DropdownItem from "./DropDownItem";
import NavItemButton from "./NavItemButton";
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

  const onToggleDropdown = () => {
    setActive(active === lcText ? "" : lcText);
  };

  const onItemClick = (itemLink) => {
    navigate(itemLink);
    setActive(lcText);
  };

  return (
    <Box>
      <ListItem
        key={text}
        sx={{
          textAlign: "center",
        }}
      >
        <NavItemButton
          text={text}
          icon={icon}
          lcText={lcText}
          theme={theme}
          active={active}
          navButtonBackgroundColor={navButtonBackgroundColor}
          isDropdown={isDropdown}
          onToggleDropdown={
            isDropdown ? onToggleDropdown : () => onItemClick(link)
          }
        />
      </ListItem>
      <List sx={{ px: 2, py: 0 }}>
        {isDropdown &&
          active === lcText &&
          dropdownItems.map(({ text: itemText, link: itemLink }) => (
            <DropdownItem
              key={itemText}
              itemText={itemText}
              itemLink={itemLink}
              active={active}
              setActive={setActive}
            />
          ))}
      </List>
    </Box>
  );
};

export default NavigationItem;

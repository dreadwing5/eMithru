import { List } from "@mui/material";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavItemsList = ({ navConfig, active, setActive, userRole }) => {
  if (!Array.isArray(navConfig)) {
    return null; // Return null if navConfig is not an array
  }

  return (
    <List>
      {navConfig.map(({ text, icon, link, dropdownItems }) => (
        <NavigationItem
          key={text}
          text={text}
          icon={icon}
          link={link}
          dropdownItems={dropdownItems}
          active={active}
          setActive={setActive}
          userRole={userRole}
        />
      ))}
    </List>
  );
};

export default NavItemsList;

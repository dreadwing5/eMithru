import { List } from "@mui/material";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavItemsList = ({ navConfig, active, setActive }) => {
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
        />
      ))}
    </List>
  );
};

export default NavItemsList;

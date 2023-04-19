import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const NavConfig = [
  {
    text: "Dashboard",
    icon: <HomeOutlinedIcon />,
    link: "/",
  },
  {
    text: "Meetings",
    icon: <EventOutlinedIcon />,
    link: "/meetings",
  },
  {
    text: "Chat",
    icon: <ChatOutlinedIcon />,
    link: "/chat",
  },
  {
    text: "Users",
    icon: <PersonOutlinedIcon />,
    link: "/users",
  },
  {
    text: "Student",
    icon: <AccountCircleOutlinedIcon />,
    link: "/student",
    dropdownItems: [
      { text: "Profile", link: "/student/profile" },
      { text: "Academic", link: "/student/academic" },
      { text: "Admission", link: "/student/admission" },
    ],
  },
  {
    text: "Info Bot",
    icon: <InfoOutlinedIcon />,
    link: "/info-bot",
  },
  {
    text: "Mentor Allocation",
    icon: <PersonOutlinedIcon />,
    link: "/mentor",
  },
];

export default NavConfig;

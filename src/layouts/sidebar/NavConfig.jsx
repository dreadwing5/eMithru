import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

const adminNavConfig = [
  {
    text: "Add User",
    icon: <PersonAddOutlinedIcon />,
    link: "/admin/add-user",
  },
  { text: "View Users", icon: <PeopleOutlinedIcon />, link: "/admin/users" },
  {
    text: "Mentor Assignment",
    icon: <PersonOutlinedIcon />,
    link: "/admin/mentor-assignment",
  },
];

const facultyNavConfig = [
  { text: "Threads", icon: <QuestionAnswerOutlinedIcon />, link: "/threads" },
  { text: "Report", icon: <ReportOutlinedIcon />, link: "/report" },
  { text: "Meetings", icon: <EventOutlinedIcon />, link: "/meetings" },
  { text: "Chat", icon: <ChatOutlinedIcon />, link: "/chat" },
  { text: "Campus Buddy", icon: <InfoOutlinedIcon />, link: "/campus-buddy" },
  { text: "My Mentees", icon: <PersonOutlinedIcon />, link: "/mentees" },
];

const studentNavConfig = [
  { text: "Home", icon: <HomeOutlinedIcon />, link: "/" },
  { text: "Threads", icon: <QuestionAnswerOutlinedIcon />, link: "/threads" },
  { text: "Report", icon: <ReportOutlinedIcon />, link: "/report" },
  { text: "Meetings", icon: <EventOutlinedIcon />, link: "/meetings" },
  { text: "Chat", icon: <ChatOutlinedIcon />, link: "/chat" },
  { text: "Campus Buddy", icon: <InfoOutlinedIcon />, link: "/campus-buddy" },
];

const getNavConfig = (role) => {
  console.log("ROLE", role);
  switch (role) {
    case "admin":
      return adminNavConfig;
    case "faculty":
      return facultyNavConfig;
    case "student":
      return studentNavConfig;
    default:
      return [];
  }
};

export default getNavConfig;

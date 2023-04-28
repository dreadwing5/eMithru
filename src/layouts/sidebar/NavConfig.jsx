import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
const NavConfig = [
  {
    text: "Dashboard",
    icon: <HomeOutlinedIcon />,
    link: "/",
  },
  {
    text: "Threads",
    icon: <QuestionAnswerOutlinedIcon />,
    link: "/threads",
  },

  {
    text: "Report",
    icon: <ReportOutlinedIcon />,
    link: "/report",
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
    text: "Campus Buddy",
    icon: <InfoOutlinedIcon />,
    link: "/campus-buddy",
  },
  {
    text: "Student",
    icon: <AccountCircleOutlinedIcon />,
    link: "/student",
    dropdownItems: [
      { text: "Profile", link: "/student/profile" },
      { text: "Academic", link: "/student/academic" },
      { text: "Admission", link: "/student/admission" },
      { text: "Placement", link: "/student/placement" },
      {
        text: "Attendance",
        link: "/student/attendance",
        icon: <CheckCircleOutlinedIcon />,
      },
      {
        text: "PTM Record",
        icon: <PersonOutlinedIcon />,
        link: "/student/ptm",
      },
    ],
  },
  {
    text: "Mentor",
    icon: <PersonOutlinedIcon />,
    link: "/mentor",
  },
];

export default NavConfig;

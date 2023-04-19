import { ChevronRightOutlined } from "@mui/icons-material";

const CollapseButton = ({ active, lcText }) => {
  return active === lcText && <ChevronRightOutlined sx={{ ml: "auto" }} />;
};

export default CollapseButton;

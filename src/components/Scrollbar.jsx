import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Box } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

const Scrollbar = forwardRef(({ children, sx }, ref) => {
  const scrollRef = React.useRef();

  useImperativeHandle(ref, () => ({
    scrollToBottom: () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    },
  }));
  const theme = useTheme();
  return (
    <Box
      ref={scrollRef}
      sx={{
        position: "relative",
        flexGrow: 1,
        height: "100%",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: 6,
          height: 6,
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: alpha(theme.palette.text.primary, 0.2),
          borderRadius: 8,
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
});

export default Scrollbar;

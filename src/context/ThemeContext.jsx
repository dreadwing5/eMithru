import { createContext, useMemo, useState } from "react";

import { createTheme } from "@mui/material";

import { themeSettings } from "../theme";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prevMode) => (prevMode === "dark" ? "light" : "dark")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));

  return [theme, colorMode];
};

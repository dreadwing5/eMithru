import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const SettingsContext = createContext({
  toggleSettingsMode: () => {},
});

// SettingsProvider.propTypes = {
//   children: PropTypes.node,
// };

function SettingsProvider({ children }) {
  const [themeMode, setThemeMode] = useState("dark");
  const onToggleMode = useMemo(
    () => ({
      toggleThemeMode: () =>
        setThemeMode((prevMode) => (prevMode === "dark" ? "light" : "dark")),
    }),
    [setThemeMode]
  );

  return (
    <SettingsContext.Provider value={{ themeMode, onToggleMode }}>
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };

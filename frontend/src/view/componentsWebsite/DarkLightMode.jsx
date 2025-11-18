import { createContext, useContext, useState, useEffect } from "react";
import { PiSunDuotone, PiMoonDuotone  } from "react-icons/pi";

const ThemeContext = createContext();

export const DarkLightModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Load from localStorage on mount
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook for using theme anywhere
export function useTheme() {
  return useContext(ThemeContext);
}

// This component is your clickable toggle icon
export const DarkLightMode = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <span className="d-flex align-items-center justify-content-center" role="button" onClick={toggleDarkMode} title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
      {darkMode ? <PiSunDuotone size={25} /> : <PiMoonDuotone size={25} />}
    </span>
  );
};

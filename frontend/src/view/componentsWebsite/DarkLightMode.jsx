import React, { useState } from "react";
import { FaRegSun, FaRegMoon } from "react-icons/fa6";

const DarkLightMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme from localStorage
  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme");
  //   if (savedTheme === "dark") {
  //     setDarkMode(true);
  //     document.body.classList.add("bg-dark", "text-light");
  //   }
  // }, []);

  // Toggle and save theme
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.body.classList.add("bg-dark", "text-light");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("bg-dark", "text-light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <span className={`${darkMode ? "text-white" : "text-dark"} ms-2`} onClick={toggleTheme}>
      {darkMode ? <FaRegSun size={21} /> : <FaRegMoon size={21} />}
    </span>
  );
};

export default DarkLightMode;

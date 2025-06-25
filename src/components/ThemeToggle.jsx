import { useRef, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import sun from "/theme/sun.svg";
import moon from "/theme/moon.svg";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const toggleRef = useRef(null);

  useEffect(() => {
    toggleRef.current.classList.toggle("translate-x-6", theme === "dark");
    toggleRef.current.classList.toggle("translate-x-0", theme === "light");
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      className="w-12 h-6 p-1 rounded-full flex justify-between relative border border-black dark:border-white z-10"
      onClick={toggleDarkMode}
    >
      <img src={sun} alt="Light mode" className="z-20" />
      <img src={moon} alt="Dark mode" className="z-20" />
      <span
        ref={toggleRef}
        className="bg-black w-6 h-6 rounded-full absolute top-[-1px] left-0 dark:bg-white transition-transform duration-200 translate-x-0"
      ></span>
    </button>
  );
};

export default ThemeToggle;

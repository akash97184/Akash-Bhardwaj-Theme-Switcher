import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import type { AppDispatch, RootState } from "@/store";
import { setTheme } from "@/store/themeSlice";
import { FaAngleDown } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";
import { cn } from "@/lib/utils";
import type { Theme } from "@/lib/types";
import useOutsideClick from "@/hooks/useOutsideClick";

const themes: Theme[] = ["light", "dark", "colorful"];

const getThemeStyles = (theme: Theme) => {
  const isDark = theme === "dark";
  const isColorful = theme === "colorful";

  return {
    dropdownbutton: isDark
      ? "border-white/70 bg-[var(--theme-dark-color)]/90 text-white"
      : isColorful
      ? "bg-gradient-to-r from-pink-500 to-indigo-400 text-white"
      : "bg-[var(--theme-light-color)]/90  text-white",
    dropdown: isDark ? "bg-black/80" : "bg-white text-black",
    dropdownHover: "transition-colors",
    dropdownSelectedColor: isDark
      ? "var(--theme-dark-color)"
      : isColorful
      ? "var(--theme-colorful-color)"
      : "var(--theme-light-color)",
  };
};

const ThemeSwitcher = () => {
  const dispatch = useDispatch<AppDispatch>();
  const themeDropDownRef = useRef<HTMLDivElement>(null);
  const { initialTheme: currentTheme } = useSelector(
    (state: RootState) => state.theme
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (theme: Theme) => {
    dispatch(setTheme(theme));
    document.documentElement.setAttribute("data-theme", theme);
    setIsOpen(false);
  };

  const { dropdownbutton, dropdown, dropdownHover, dropdownSelectedColor } =
    getThemeStyles(currentTheme);

  useOutsideClick(themeDropDownRef, () => setIsOpen(false));

  return (
    <div ref={themeDropDownRef} className="relative z-[100]">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer border  transition-all",
          dropdownbutton
        )}>
        <IoIosColorPalette className=" text-white" />
        {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}
        <FaAngleDown
          className={`w-4 h-4 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul
          className={cn(
            "absolute right-0 mt-5 p-2 w-44 list-none border rounded-lg shadow-lg z-[100]",
            dropdown
          )}>
          {themes.map((theme) => (
            <li
              key={theme}
              onClick={() => handleThemeChange(theme)}
              className={cn(
                "px-2 py-1 cursor-pointer border-l-2",
                dropdownHover,
                currentTheme === theme ? "" : "border-transparent"
              )}
              style={{
                borderColor:
                  currentTheme === theme
                    ? dropdownSelectedColor
                    : "transparent",
              }}>
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemeSwitcher;

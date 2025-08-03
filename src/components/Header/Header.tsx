import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { BsStack } from "react-icons/bs";
import { cn } from "@/lib/utils";
import type { RootState } from "@/store";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { useRef, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import type { Theme } from "@/lib/types";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import useOutsideClick from "@/hooks/useOutsideClick";
import { navLinks } from "@/lib/constants";

const getThemeStyles = (theme: Theme) => {
  const isDark = theme === "dark";
  const isColorful = theme === "colorful";

  return {
    headerBg: isDark
      ? "bg-[var(--background-dark-color)] text-white"
      : isColorful
      ? "bg-gradient-to-r from-pink-500 to-indigo-500 text-white"
      : "bg-white/50 text-black",

    iconColor: isColorful
      ? "text-[var(--theme-colorful-color)]"
      : isDark
      ? "text-[var(--theme-dark-color)]"
      : "text-[var(--theme-light-color)]",

    itemCountStyle: isColorful
      ? "bg-gradient-to-r from-pink-500 to-indigo-500 text-white"
      : isDark
      ? "bg-[var(--theme-dark-color)] text-white"
      : "bg-[var(--theme-light-color)] text-white",

    navLink:
      isDark || isColorful
        ? "text-white border-white"
        : "text-gray-800 border-blue-500",

    navLinkItemBorder: isColorful
      ? "border-white"
      : isDark
      ? "border-[var(--theme-dark-color)]"
      : "border-[var(--theme-light-color)]",
  };
};

const Header = () => {
  const { initialTheme: currentTheme, itemCount } = useSelector(
    (state: RootState) => state.theme
  );
  const menuDropDownRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { pathname } = useLocation();

  const { headerBg, iconColor, navLink, itemCountStyle, navLinkItemBorder } =
    getThemeStyles(currentTheme);

  useOutsideClick(menuDropDownRef, () => setIsMenuOpen(false));

  const renderLinks = () =>
    navLinks.map(({ path, label }) => {
      const isActive = pathname === path;

      return (
        <li key={label}>
          <Link
            to={path}
            aria-label={label}
            className={cn(
              "font-[400] text-[16px] sm:text-[20px] px-2 py-1 md:py-2  transition-all duration-300",
              isActive && "border-b-[5px] fade-up-border ",
              navLinkItemBorder
            )}>
            {label}
          </Link>
        </li>
      );
    });

  return (
    <header
      className={cn(
        " w-full flex fixed z-[999]  justify-between items-center border-b border-[#181D24] px-3 sm:px-6 py-4 backdrop-blur-md shadow",
        headerBg
      )}>
      {currentTheme !== "dark" && (
        <div className="flex items-center gap-2">
          {currentTheme === "colorful" ? (
            <FaWandMagicSparkles className={cn("text-xl text-white")} />
          ) : (
            <BsStack className={cn("text-xl", iconColor)} />
          )}
          <h1 className={cn("text-xl font-bold", navLink)}>ThemeSwitch</h1>
        </div>
      )}

      {currentTheme !== "dark" && (
        <ul className=" justify-center hidden md:flex list-none items-center space-x-6 text-lg">
          {renderLinks()}
        </ul>
      )}

      <div ref={menuDropDownRef} className="relative flex gap-5 items-center">
        <div className=" relative  hidden sm:block">
          <p
            className={cn(
              " w-6 h-6 p-2 rounded-full absolute flex justify-center items-center text-[10px] sm:text-sm -top-3 -right-3",
              itemCountStyle
            )}>
            {itemCount}
          </p>
          <button
            type="button"
            title="store"
            className=" focus:outline-none cursor-pointer">
            <MdOutlineLocalGroceryStore className="text-2xl text-black/[0.8]" />
          </button>
        </div>
        <ThemeSwitcher />
        <button
          type="button"
          className="md:hidden focus:outline-none cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <HiX className="text-2xl text-black/[0.8]" />
          ) : (
            <HiMenu className="text-2xl text-black/[0.8]" />
          )}
        </button>
        {isMenuOpen && (
          <div className="hidden max-md:flex absolute text-center top-[60px] right-0 min-w-[185px] z-[100] flex-col gap-4 p-5 border-[1px] border-white/[0.15] bg-black/40 backdrop-blur-[30px] rounded-md">
            <ul
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.closest("a")) setIsMenuOpen(false);
              }}
              className="flex flex-col gap-5">
              {renderLinks()}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

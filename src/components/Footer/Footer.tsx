import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { cn } from "@/lib/utils";
import type { Theme } from "@/lib/types";

const getThemeStyles = (theme: Theme) => {
  const isDark = theme === "dark";
  const isColorful = theme === "colorful";

  return {
    footerBg: isDark
      ? "bg-[var(--background-dark-color)] text-white w-full sm:w-[calc(100vw-300px)]"
      : isColorful
      ? "bg-gradient-to-r from-pink-500 to-indigo-500 text-white w-full"
      : "bg-white text-black w-full",

    linkColor: isDark || isColorful ? "text-white" : "text-gray-700",
  };
};

const Footer = () => {
  const { initialTheme: currentTheme } = useSelector(
    (state: RootState) => state.theme
  );
  const { footerBg, linkColor } = getThemeStyles(currentTheme);

  return (
    <footer className={cn("fixed bottom-0  py-6 px-4  shadow-inner", footerBg)}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} ThemeSwitch. All rights reserved.
        </p>
        <ul className="flex gap-4 text-sm font-medium">
          <li>
            <a href="#" className={cn("hover:underline", linkColor)}>
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className={cn("hover:underline", linkColor)}>
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#" className={cn("hover:underline", linkColor)}>
              Help
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

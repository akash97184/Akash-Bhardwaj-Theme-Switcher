import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const WelcomeSection = () => {
  const currentTheme = useSelector((state: RootState) => state.theme.initialTheme);

  const getThemeColor = () => {
    if (currentTheme === "dark") return "var(--theme-dark-color)";
    if (currentTheme === "colorful") return "var(--theme-colorful-color)";
    return "var(--theme-light-color)";
  };

  return (
    <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4">
        Welcome to Theme Switcher App
      </h1>
      <p className="text-gray-500 max-w-xl mb-6 ">
        Experience the power of dynamic theming with our intuitive theme
        switcher. This minimalist design focuses on clean typography and
        spacious layouts for optimal readability.
      </p>
      <Link
        to="/about"
        className={cn(
          "text-white font-medium px-6 py-2 rounded transition",
          "hover:brightness-110"
        )}
        style={{
          backgroundColor: getThemeColor(),
        }}
      >
        Get Started
      </Link>
    </section>
  );
};

export default WelcomeSection;

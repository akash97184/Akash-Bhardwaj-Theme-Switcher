import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const About = () => {
  const currentTheme = useSelector((state: RootState) => state.theme.initialTheme);

  const themeStyles = {
    heading: {
      light: "text-gray-800",
      dark: "text-white",
      colorful: "text-black/90",
    },
    paragraph: {
      light: "text-gray-600",
      dark: "text-gray-300",
      colorful: "text-black/60",
    },
    background: {
      light: "bg-transparent",
      dark: "bg-transparent",
      colorful: "bg-transparent",
    },
  };

  return (
    <div
      className={`max-w-5xl mx-auto px-6 py-16 text-center transition-all duration-300 ${themeStyles.background[currentTheme]}`}
    >
      <h1
        className={`text-3xl font-bold mb-6 transition-colors duration-300 ${themeStyles.heading[currentTheme]}`}
      >
        About Us
      </h1>
      <p
        className={`text-lg transition-colors duration-300 ${themeStyles.paragraph[currentTheme]}`}
      >
        Theme Switcher App was built to demonstrate the power of dynamic theming
        in React. Our app provides an elegant and intuitive way to switch
        between light, dark, and colorful themes. We value simplicity, clean
        typography, and a responsive user experience.
      </p>
    </div>
  );
};

export default About;

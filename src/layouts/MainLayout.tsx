import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LightThemeLayout from "./lightThemeLayout";
import DarkThemeLayout from "./darkThemeLayout";
import ColorFulThemeLayout from "./ColorFulThemeLayout";
import type { RootState } from "../store";

const MainLayout = () => {
  const theme = useSelector((state: RootState) => state.theme.initialTheme);

  const layoutMap = {
    light: LightThemeLayout,
    dark: DarkThemeLayout,
    colorful: ColorFulThemeLayout,
  };

  const LayoutComponent = layoutMap[theme] || LightThemeLayout; // fallback to Light

  return (
    <LayoutComponent>
      <Outlet />
    </LayoutComponent>
  );
};

export default MainLayout;

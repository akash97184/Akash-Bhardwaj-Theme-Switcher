import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BsStack } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";
import { navLinks } from "@/lib/constants";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import Footer from "@/components/Footer/Footer";

const DarkThemeLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 768);

  const { itemCount } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleResize = (e: MediaQueryListEvent) => {
      setShowSidebar(e.matches); // true if >= md
    };

    // Initial check
    setShowSidebar(mediaQuery.matches);

    // Add listener
    mediaQuery.addEventListener("change", handleResize);

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div className="flex bg-[var(--background-dark-color)] font-sans-bold text-white min-h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "w-64 bg-[var(--sidebar-dark-color)] h-screen md:static md:block z-[200] fixed top-0 left-0 transition-transform duration-300 ease-in-out",
          showSidebar ? "translate-x-0" : "-translate-x-full"
        )}>
        <div className="flex items-center gap-2 mb-10 p-6">
          <BsStack className="text-xl text-[var(--theme-dark-color)]" />
          <h1 className="text-xl font-bold">ThemeSwitch</h1>
        </div>
        <nav className="space-y-3">
          {navLinks.map(({ path, label, Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => window.innerWidth < 768 && setShowSidebar(false)} // close on mobile
              className={cn(
                "px-3 py-3 border-l-[5px] flex gap-2 items-center",
                pathname === path
                  ? "border-[var(--theme-dark-color)] bg-[var(--theme-dark-color)]/40"
                  : "border-transparent"
              )}>
              {Icon && <Icon />}
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 w-full bg-[var(--background-dark-color)]   md:px-6">
        {/* Header */}
        <div className="w-full md:w-[calc(100vw-300px)] z-[100] fixed top-0  text-white bg-transparent backdrop-blur-sm  flex justify-between items-center border-b border-[#181D24] px-3 py-4">
          <h2 className="text-xl font-[500] capitalize">
            {pathname === "/"
              ? "Home"
              : pathname === "/about"
              ? "About"
              : pathname === "/contact"
              ? "Contact"
              : pathname.replace("/", "").replace(/-/g, " ")}
          </h2>
          <div className=" z-[999] w-fit flex justify-between items-center">
            <div className="w-full flex items-center gap-7">
              <div className="w-fit relative">
                <p
                  className={cn(
                    " w-6 h-6 p-2 rounded-full bg-[var(--theme-dark-color)] text-white absolute flex justify-center items-center text-[10px] sm:text-sm -top-3 -right-3"
                  )}>
                  {itemCount}
                </p>
                <button
                  type="button"
                  title="store"
                  className=" focus:outline-none cursor-pointer">
                  <MdOutlineLocalGroceryStore className="text-2xl text-white" />
                </button>
              </div>
              <ThemeSwitcher />
            </div>
            {/* Mobile menu button */}
            <button
              title="menu bar"
              type="button"
              className="md:hidden text-white text-2xl ml-3 cursor-pointer"
              onClick={() => setShowSidebar((prev) => !prev)}>
              {showSidebar ? (
                <HiX className="text-2xl " />
              ) : (
                <HiMenu className="text-2xl " />
              )}
            </button>
          </div>
        </div>

        {/* Page Content */}
        <main className="py-20 px-4 md:px-8 max-w-7xl h-[calc(100vh-60px)] overflow-y-auto  mx-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DarkThemeLayout;

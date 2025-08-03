import type { ReactNode } from "react";
import Header from "../components/Header/Header";
import Footer from "@/components/Footer/Footer";

const ColorFulThemeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#FDEAA7] pacifico-regular min-h-screen text-gray-800">
      <Header />
      <main className=" py-30 sm:py-20 px-4 md:px-8 max-w-7xl  mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default ColorFulThemeLayout;

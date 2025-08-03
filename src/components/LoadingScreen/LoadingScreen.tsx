import type { FC } from "react";

const LoadingScreen: FC = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-sm z-[999]"
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-xl font-bold text-white animate-bounce">
          MultiTheme App
        </h1>
      </div>
    </div>
  );
};

export default LoadingScreen;

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path, { resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist", // Specify the output directory
    minify: "esbuild",
    sourcemap: false, // Disable source maps for production builds
    emptyOutDir: true,
    cssCodeSplit: true, // Enable CSS code splitting
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"), // Specify your main entry point
      },
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          reactRouter: ["react-router", "react-router-dom"],
          utility: ["clsx", "class-variance-authority", "tailwind-merge"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

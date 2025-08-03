import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import MainLayout from "../layouts/MainLayout";
import { ROUTES } from "./routes";
import Home from "@/pages/Home";

const About = lazy(() => import("@/pages/About/index"));
const Contact = lazy(() => import("@/pages/Contact/index"));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path={ROUTES.HOME} element={<MainLayout />}>
            <Route index path={ROUTES.HOME} element={<Home />} />
            <Route index path={ROUTES.ABOUT} element={<About />} />
            <Route index path={ROUTES.CONTACT} element={<Contact />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;

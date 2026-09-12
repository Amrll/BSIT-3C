import { Routes, Route } from "react-router";
import LandingPage from "../pages/landing/LandingPage";
import LoginPage from "../pages/login/LoginPage";
import AboutPage from "../pages/about/AboutPage";
import MainLayout from "../layout/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;

import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

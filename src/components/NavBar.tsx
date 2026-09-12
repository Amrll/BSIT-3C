import { Link, NavLink } from "react-router";

const NavBar = () => {
  return (
    <header className="flex items-center px-6 py-4 border-b bg-white">
      <Link to="/" className="text-xl font-bold text-black">
        LOGO
      </Link>

      <nav className="ml-auto flex items-center gap-4">
        <NavLink to="/about" className="text-gray-700 hover:text-blue-500">
          About
        </NavLink>
        <NavLink to="/login" className="text-gray-700 hover:text-blue-500">
          Login
        </NavLink>
      </nav>
    </header>
  );
};

export default NavBar;

import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav-brand">
        🏅 Find My Sport
      </NavLink>
      <div className="nav-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/quiz"
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
        >
          Quiz
        </NavLink>
        <NavLink
          to="/sports"
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
        >
          Sports
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
}
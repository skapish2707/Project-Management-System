import React from "react";
import "./LoggedNavbar.css";
import { Link } from "react-router-dom";

const LoggedNavbar = () => {
  return (
    <header className="header">
      <nav className="header-links">
        <ul>
          <a href="#">Profile</a>
          <Link to="/logout">Logout</Link>
        </ul>
      </nav>
    </header>
  );
};

export default LoggedNavbar;

import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <NavLink
        className={({ isActive }) => {
          return isActive ? "activeLink" : "";
        }}
        to="/"
      >
        <h2>Roc8 Shopping Page</h2>
      </NavLink>

      <nav className="nav">
        <NavLink
          className={({ isActive }) => {
            return isActive ? "activeLink" : "";
          }}
          to="/products"
        >
          Products
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "activeLink" : "";
          }}
          to="/Cart"
        >
          Cart
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;

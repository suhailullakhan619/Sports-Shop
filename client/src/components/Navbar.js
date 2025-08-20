// client/src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        backgroundColor: "#121212",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.8)",
      }}
    >
      <h1 style={{ color: "#00BFFF", fontSize: "1.8rem", fontWeight: "bold" }}>
        SPORTS-SHOP
      </h1>
      <div>
        <Link
          to="/"
          style={navLinkStyle}
        >
          Home
        </Link>
        <Link
          to="/products"
          style={navLinkStyle}
        >
          Products
        </Link>
        <Link
          to="/cart"
          style={navLinkStyle}
        >
          Cart
        </Link>
        <Link
          to="/orders"
          style={navLinkStyle}
        >
          Orders
        </Link>
      </div>
    </nav>
  );
};

const navLinkStyle = {
  color: "#e0f7ff",
  marginLeft: "1.5rem",
  textDecoration: "none",
  fontSize: "1.1rem",
  fontWeight: "500",
  transition: "color 0.3s ease",
};

export default Navbar;

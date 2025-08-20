// client/src/pages/Home.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Sports Wear", image: "/images/Sportswear.jpg" },
  { name: "Sports Equipment", image: "/images/Sportsequipment.jpg" },
  { name: "Fitness Gear", image: "/images/Fitnessgear.jpg" },
];

const Home = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/products");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center", backgroundColor: "#0d1117", color: "white", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "3.5rem", marginBottom: "0.5rem", color: "#00bcd4" }}>SPORTS-SHOP</h1>
      <p style={{ fontSize: "1.3rem", color: "#8ab4f8", marginBottom: "3rem" }}>
        Gear Up for Greatness – Where Passion Meets Performance!
      </p>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        marginBottom: "4rem",
        marginTop: "2rem"
      }}>
        {categories.map((cat, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              position: "relative",
              transition: "transform 0.4s, filter 0.4s, box-shadow 0.4s",
              transform: hoveredIndex === index ? "scale(1.2)" : "scale(1)",
              filter: hoveredIndex !== null && hoveredIndex !== index ? "blur(4px)" : "none",
              boxShadow: hoveredIndex === index ? "0 0 30px #00bcd4" : "none",
              borderRadius: "12px",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              style={{
                width: "280px",
                height: "340px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
            <p style={{
              position: "absolute",
              bottom: "10px",
              left: "0",
              right: "0",
              color: "white",
              background: "rgba(0, 0, 0, 0.6)",
              margin: 0,
              padding: "0.5rem",
              fontSize: "1.2rem",
              fontWeight: "bold",
              borderBottomLeftRadius: "12px",
              borderBottomRightRadius: "12px",
            }}>
              {cat.name}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={handleNavigate}
        style={{
          padding: "0.9rem 2rem",
          fontSize: "1.1rem",
          background: "linear-gradient(to right, #00bcd4, #2196f3)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 0 15px #00bcd4",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
        onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
      >
        Browse Products
      </button>
    </div>
  );
};

export default Home;

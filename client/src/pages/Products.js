import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

// Manually imported images
import Nikeshoes from '../assets/images/Nikeshoes.jpg';
import Addidasfootball from '../assets/images/Addidasfootball.jpg';
import Pumatshirt from '../assets/images/Pumatshirt.jpg';
import Wilsontennisracket from '../assets/images/Wilsontennisracket.jpg';
import Underarmour from '../assets/images/Underarmour.jpg';
import Speedogoggles from '../assets/images/Speedogoggles.jpg';
import Reebokbag from '../assets/images/Reebokbag.jpg';
import Yonex from '../assets/images/Yonex.jpg';
import Nikehead from '../assets/images/Nikehead.jpg';
import Yogamat from '../assets/images/Yogamat.jpg';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderError, setOrderError] = useState('');

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        const data = response.data;
        const imageList = [
          Nikeshoes,
          Addidasfootball,
          Pumatshirt,
          Wilsontennisracket,
          Underarmour,
          Speedogoggles,
          Reebokbag,
          Yonex,
          Nikehead,
          Yogamat
        ];
        const updated = data.map((p, i) => ({ ...p, image: imageList[i] }));
        setProducts(updated);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleBuyNow = async (productId) => {
    try {
      setOrderError('');
      const response = await axios.post("http://localhost:5000/api/orders", {
        productId,
        quantity: 1,
      });

      if (response.status === 201) {
        setOrderPlaced(true);
        setTimeout(() => setOrderPlaced(false), 3000);
        alert('Order placed successfully!');
        window.location.href = '/orders';
      }
    } catch (err) {
      console.error('Order placement error:', err.message);
      setOrderError('Failed to place order');
      alert('Failed to place order. Please try again.');
    }
  };

  if (loading) return <p style={{ color: "white", textAlign: "center" }}>Loading products...</p>;

  return (
    <div style={{ padding: "2rem", backgroundColor: "#121212", color: "#f5f5f5", minHeight: "100vh" }}>
      {orderError && (
        <div style={{
          backgroundColor: '#ff5252',
          padding: '1rem',
          borderRadius: '5px',
          textAlign: 'center',
          marginBottom: '1rem'
        }}>
          {orderError}
        </div>
      )}

      <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>All Products</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1.5rem"
      }}>
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              backgroundColor: "#1e1e1e",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
              transition: "transform 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover"
              }}
            />
            <div style={{ padding: "1rem" }}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>₹{product.price}</strong></p>

              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    padding: "0.5rem 1.2rem",
                    backgroundColor: "#03a9f4",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    boxShadow: "0 0 10px rgba(3, 169, 244, 0.5)",
                    transition: "all 0.3s ease-in-out"
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = "0 0 15px rgba(3, 169, 244, 0.8)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = "0 0 10px rgba(3, 169, 244, 0.5)")
                  }
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => handleBuyNow(product._id)}
                  style={{
                    padding: "0.5rem 1.2rem",
                    backgroundColor: "#4caf50",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    boxShadow: "0 0 10px rgba(76, 175, 80, 0.5)",
                    transition: "all 0.3s ease-in-out"
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = "0 0 15px rgba(76, 175, 80, 0.8)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = "0 0 10px rgba(76, 175, 80, 0.5)")
                  }
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {orderPlaced && (
        <div style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          backgroundColor: "#4caf50",
          color: "white",
          padding: "1rem",
          borderRadius: "5px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
        }}>
          ✅ Order placed successfully!
        </div>
      )}
    </div>
  );
};

export default Products;

// client/src/pages/Cart.js
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../index.css"; // Importing CSS

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-page">
      <h2 className="cart-header">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is currently empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p className="price">Price: ₹{item.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;

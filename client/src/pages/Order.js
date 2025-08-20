// client/src/pages/Order.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading orders...</p>;

  if (orders.length === 0) return <p>No orders placed yet.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Orders</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        {orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              padding: "1rem",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            {order.productId && (
              <>
                <img
                  src={order.productId.imageUrl}
                  alt={order.productId.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <h3>{order.productId.name}</h3>
                <p>Quantity: {order.quantity}</p>
                <p>Price: ₹{order.productId.price}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;

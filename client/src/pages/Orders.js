// client/src/pages/Orders.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../index.css"; // Importing CSS

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/orders");
      setOrders(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
      console.error("❌ Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
      </div>
    );
  }

  if (orders.length === 0) {
    return <p>No orders placed yet.</p>;
  }

  return (
    <div className="orders-page">
      <h2 className="orders-header">Your Orders</h2>
      <div className="orders-grid">
        {orders.map((order) => (
          <div className="order-item" key={order._id}>
            <p><strong>Product:</strong> {order.productId?.name || 'Product not found'}</p>
            <p><strong>Price:</strong> ₹{order.productId?.price || 'N/A'}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

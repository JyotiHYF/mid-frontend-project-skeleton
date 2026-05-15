import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePlaceOrder() {
    setError("");

    if (!user || !token) {
      navigate("/login");
      return;
    }
    setLoading(true);
    try {
      const order = {
        userId: user.id,
        items: cartItems,
        total: cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        ),
        createdAt: new Date().toISOString(),
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });

      if (!res.ok) {
        throw new Error("Failed to place order");
      }

      clearCart();
      navigate("/order-success", {
        state: { success: true },
      });
    } catch (err) {
      setError("Something went wrong while placing order");
    } finally {
      setLoading(false);
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty 🛒</h2>
        <Link to="/events">
          <button className="cta-btn">Discover Events</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-box">
        <h1>Checkout</h1>

        {cartItems.map((item) => (
          <div key={item.id} className="checkout-item">
            <div>
              <h3>{item.name}</h3>
              <p>
                {item.quantity} × {item.price} DKK
              </p>
            </div>

            <p>{item.quantity * item.price} DKK</p>
          </div>
        ))}

        <div className="checkout-total">
          <h2>Total: {total} DKK</h2>
        </div>

        {error && <p className="error">{error}</p>}

        <button
          className="checkout-btn"
          onClick={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}

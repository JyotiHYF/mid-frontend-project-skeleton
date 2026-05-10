import { useCart } from "../../context/CartContext";
import "./CartPage.css";
import { Link } from "react-router-dom";
export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, total } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty 🛒</h2>
        <p>Go find some events!</p>
        <Link to="/events">
          <button className="cta-btn">Discover Events</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-box">
        <h2>Your cart</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div>
              <h3>{item.name}</h3>
              <p>{item.price} DKK</p>
            </div>

            <div className="qty-controls">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}

        <div className="cart-footer">
          <h2>Total: {total} DKK</h2>

          <button className="clear-btn" onClick={clearCart}>
            Clear cart
          </button>

          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  );
}

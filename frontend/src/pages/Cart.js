import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../css/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const priceWithoutCurrency = parseFloat(item.price.replace('₹', '').replace(/,/g, ''));
      return total + priceWithoutCurrency * item.quantity;
    }, 0);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              
              <div className="cart-item-details">
                <h5>{item.name}</h5>
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <div className="cart-quantity">
                  <button onClick={() => decreaseQuantity(item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item._id)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Total: ₹{calculateTotalPrice().toLocaleString()}</h3>
            <Link to="/confirmation">
              <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

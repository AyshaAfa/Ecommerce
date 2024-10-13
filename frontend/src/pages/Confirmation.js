import React, { useState } from 'react';
import axios from 'axios';
import '../css/Confirmation.css';

const Confirmation = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const cartItems = [
    {
      productName: 'Dell Inspiron 15 (Blue)',
      quantity: 1,
      price: 54999
    }
  ];

  const totalPrice = 54999;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === '' || address === '' || phoneNumber === '') {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/create-order', {
        name,
        address,
        phone: phoneNumber,
        paymentMethod,
        cartItems,
        totalPrice
      });

      if (response.data.message === 'Order created successfully') {
        alert('Order has been placed!');
      }
    } catch (error) {
      console.log(error);
      alert('Error placing the order.');
    }
  };

  return (
    <div className="confirmation-container">
      <h2>Order Confirmation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Payment Method:</label>
          <div className="payment-options">
            <label className="payment-option">
              <input
                type="radio"
                value="UPI"
                checked={paymentMethod === 'UPI'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              UPI
            </label>
            <label className="payment-option">
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === 'COD'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery (COD)
            </label>
          </div>
        </div>
        <button type="submit" className="confirm-btn">
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default Confirmation;

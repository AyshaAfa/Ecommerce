import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import Cart from "./pages/Cart";
import Confirmation from "./pages/Confirmation";
import NavBar from "./components/NavBar";
import { CartProvider } from "./context/CartContext";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login"; 
import Signup from "./pages/Signup"; 
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <CartProvider>
      <Router>
        <NavBar />
        <main className="py-3">
          <Routes>
            <Route path="/" element={<HomeScreen />} /> 
            <Route path="/cart" element={<Cart />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/signup" element={<Signup />} /> 
            <Route path="/search" element={<SearchResults />} /> 
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;

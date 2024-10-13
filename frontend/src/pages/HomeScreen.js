import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';  
import '../css/HomeScreen.css'
import '../'

const HomeScreen = () => {
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);      

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Product data is being fetched...");
        const response = await fetch('http://localhost:5000/products');  
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log(data);
        setProducts(data);  
        setLoading(false);  
      } catch (error) {
        setError(error.message);
        setLoading(false);  
      }
    };

    fetchProducts();  
  }, []);  

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
  
   <div className="container">
      <div className="products">
        
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <Link to={`/products/${product._id}`}>
              
              {product.imageDetails && product.imageDetails.length > 0 && (
                <img src={product.imageDetails[0].url.replace("../",'/')} alt={product.name} />
              )}
              <h5>{product.name}</h5>
            </Link>
            
            <p className="category">
              Category: 
              {product.categoryDetails && product.categoryDetails.length > 0 ? 
                product.categoryDetails[0].category_name : 'N/A'}
            </p>
            <p className="price-info">
              <span className="new-price">{product.price}</span>
              <span className="old-price">{product.oldPrice}</span>
              <span className="discount">{product.discount} off</span>
            </p>
            <p>
              <span className="rating">{product.rating} ★</span> ({product.reviews} reviews)
            </p>
            <button onClick={() => addToCart(product)} className="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;

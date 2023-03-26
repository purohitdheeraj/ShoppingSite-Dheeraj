import React, { useState } from "react";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, dispatchToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const productCards = cart.map((product) => {
    return (
      <div className="card" key={product.id}>
        <img src={product.image} alt={product.title} />
        <h2>
          {product.title.length > 20
            ? product.title.slice(0, 20) + "..."
            : product.title}
        </h2>
        <p>Price: {product.price}</p>
        <h3>Ratings: {product.rating.rate}</h3>

        <div className="quantity">
          <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
          <p>{quantity}</p>
          <button
            onClick={() =>
              setQuantity((prev) => {
                return prev > 1 ? prev - 1 : 1;
              })
            }
          >
            -
          </button>
        </div>
        <button
          className="btn-add-item"
          onClick={() =>
            dispatchToCart({
              type: "REMOVE_FROM_CART",
              payload: product.id
            })
          }
        >
          Remove From Cart
        </button>
      </div>
    );
  });

  return (
    <div className="cart-page">
      <h2>Cart Page</h2>
      {cart.length > 0 ? (
        <>
          <section className="cart-"></section>

          <section className="cards-container">{productCards}</section>
        </>
      ) : (
        <>
          <Link to="/products">&#8634; go to products</Link>
          <span>add some products</span>
        </>
      )}
    </div>
  );
};

export default Cart;

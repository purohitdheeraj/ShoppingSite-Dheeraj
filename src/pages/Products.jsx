import React, { useEffect, useState } from "react";
import { getProducts } from "../api";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const { cart, dispatchToCart } = useCart();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const productsData = await getProducts();
      // console.log(productsData);
      setProducts(productsData);
      setIsLoaded(true);
    } catch (error) {
      setError(error);
      setIsLoaded(true);
    }
  };
  const displayedData = searchInput ? filteredData : products;

  const productCards = displayedData.map((product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    const productExistInCart = productInCart ? true : false;

    return (
      <div className="card" key={product.id}>
        <Link to={`${product.id}`}>
          <div>
            <img src={product.image} alt={product.title} />
            <h2>
              {product.title.length > 20
                ? product.title.slice(0, 20) + "..."
                : product.title}
            </h2>
            <p>Price: {product.price}</p>
            <h3>Ratings: {product.rating.rate}</h3>
          </div>
        </Link>
        <button
          className={`btn-add-item ${
            productExistInCart ? "disabled-btn" : "btn"
          }`}
          disabled={productExistInCart}
          onClick={() =>
            dispatchToCart({
              type: "ADD_TO_CART",
              payload: product
            })
          }
        >
          Add to Cart
        </button>
      </div>
    );
  });

  const hanldeSearch = (e) => {
    let searchQuery = e.target.value.trim();
    setSearchInput(searchQuery);
    let filteredProducts = products.filter((product) => {
      return Object.values(product)
        .join("")
        .toLowerCase()
        .includes(searchQuery);
    });
    setFilteredData(filteredProducts);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <main className="products-page">
      <h2>Product Listing Page</h2>
      <div className="filters">
        Fuzzy Search:
        <input
          type="text"
          placeholder="search products"
          value={searchInput}
          onChange={hanldeSearch}
        />
      </div>
      <section className="cards-container">{productCards}</section>
    </main>
  );
};

export default Products;

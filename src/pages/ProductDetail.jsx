import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../api";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const productId = useParams();

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      const productData = await getProduct(productId.id);
      console.log(productData);
      setProduct(productData);
      // setIsLoaded(true);
    } catch (error) {
      // setError(error);
      // setIsLoaded(true);
    }
  };

  const ProductDetailEl = product ? (
    <div key={product.id} className="product-detail-card">
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>Price: {product.price}</p>
      <h3>Ratings: {product.rating.rate}</h3>
      <p className="product-info">
        <strong> Description:</strong> {product.description}
      </p>
    </div>
  ) : (
    <div>Loading...</div>
  );

  return (
    <section className="product-details-page">
      <h2>Product Details Page</h2>
      <Link to={`..`} relative="path">
        <h3> Back to Products</h3>
      </Link>
      {ProductDetailEl}
    </section>
  );
};

export default ProductDetail;

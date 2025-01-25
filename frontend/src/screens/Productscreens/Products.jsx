import React from "react";
import { useParams,useLocation } from "react-router-dom";

const ProductPage = () => {
//   const { productName, productPrice } = useParams();
 const location = useLocation();
  const { name, price } = location.state || {};
  console.log(name);
  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Details</h1>
      <h2>{name}</h2>
      <h2>{price}</h2>
      <p>Details about the product will go here.</p>
    </div>
  );
};

export default ProductPage;

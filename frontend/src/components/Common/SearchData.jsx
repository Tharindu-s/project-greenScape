import React from "react";

const SearchData = ({ products }) => {
  console.log(products);
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product._id}>
            <h2>{product.name}</h2>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <p>
              Condition: {product.condition ? product.condition.status : "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchData;

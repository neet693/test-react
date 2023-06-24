import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";
import Pagination from "./Pagination";
import { Helmet } from "react-helmet";

const convertToSlug = (title) => {
  return title.toLowerCase().replace(/\s+/g, "-");
};

const ProductList = ({ products }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState(""); 
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sortedProducts = [...products];
  if (sortOption === "rating") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortOption === "price_asc") {
    sortedProducts.sort((a, b) => a.current_price - b.current_price);
  } else if (sortOption === "price_desc") {
    sortedProducts.sort((a, b) => b.current_price - a.current_price);
  }

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div>
        <Helmet>
          <title>Product Homepage</title>
          <meta name="description" content="Jelajahi Kelas Terbaik Kami" />
          {/* Add other meta tags */}
        </Helmet>
        <label>Sort By:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value=''>None</option>
          <option value='rating'>Rating</option>
          <option value='price_asc'>Price (Low to High)</option>
          <option value='price_desc'>Price (High to Low)</option>
        </select>
      </div>

      {currentProducts.map((product) => (
        <Link key={product.id} to={`/products/${convertToSlug(product.title)}`} className="link">
          <ProductItem
            id={product.id}
            title={product.title}
            description={product.description}
            mentor={product.mentor}
            company={product.company}
            rating={product.rating}
            total_review={product.total_review}
            current_price={product.current_price}
            original_price={product.original_price}
            course_length={product.course_length}
            total_lesson={product.total_lesson}
            level={product.level}
            image={product.image}
            created_date={product.created_date}
          />
        </Link>
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;

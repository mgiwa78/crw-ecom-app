import "./category.styles.scss";

import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import ProductCard from "../../components/product/product-card.component";
import { useSelector } from "react-redux";
import { selectCategoryMap } from "../../store/category/category.selector";

const Category = () => {
  const { category } = useParams();

  const categoryMap = useSelector(selectCategoryMap);

  const [products, setProducts] = useState(categoryMap[category]);

  useEffect(() => {
    setProducts(categoryMap[category]);
  }, [category, categoryMap]);

  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>

      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Category;

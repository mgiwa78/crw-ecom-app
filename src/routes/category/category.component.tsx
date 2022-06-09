import "./category.styles.scss";

import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import ProductCard from "../../components/product/product-card.component";
import { useSelector } from "react-redux";

import Spinner from "../../components/spinner/spinner.component";

import {
  selectCategories,
  selectCategoryMap,
  selectIsCategoriesLoading,
} from "../../store/category/category.selector";

type CategoriesRouteParams = { category: string };
const Category = () => {
  const { category } = useParams<
    keyof CategoriesRouteParams
  >() as CategoriesRouteParams;

  const categoryMap = useSelector(selectCategoryMap);
  const isLoading = useSelector(selectIsCategoriesLoading);

  const [products, setProducts] = useState(categoryMap[category]);

  useEffect(() => {
    setProducts(categoryMap[category]);
  }, [category, categoryMap]);

  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </>
  );
};

export default Category;

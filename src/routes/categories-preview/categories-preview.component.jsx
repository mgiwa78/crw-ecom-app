import { Fragment, useContext } from "react";
import { CategoryContext } from "../../context/category.context";

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { categoryMap } = useContext(CategoryContext);
  console.log(categoryMap);

  return (
    <>
      {Object.keys(categoryMap).map((title) => {
        const products = categoryMap[title];
        console.log(categoryMap);
        return <CategoryPreview key={title} item={products} title={title} />;
      })}
    </>
  );
};

export default CategoriesPreview;

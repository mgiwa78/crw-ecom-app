import { Fragment, useContext } from "react";

import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { selectCategoryMap } from "../../store/category/category.selector";

const CategoriesPreview = () => {
  const categoryMap = useSelector(selectCategoryMap);

  return (
    <>
      {Object.keys(categoryMap).map((title) => {
        const products = categoryMap[title];
        return <CategoryPreview key={title} item={products} title={title} />;
      })}
    </>
  );
};

export default CategoriesPreview;

import "./category-preview.styles.scss";
import ProductCard from "../product/product-card.component";

import { Link } from "react-router-dom";

const CategoryPreview = ({ title, item }) => {
  return (
    <div className="category-preview-container" key={title}>
      <h2>
        <Link to={title} className="title">
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">
        {item
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;

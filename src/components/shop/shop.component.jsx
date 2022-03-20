import { useContext } from "react/cjs/react.development";
import { ProductsContext } from "../../context/products.context";
import ProdectCard from "../product/product-card.component";

import "./shop.styles.scss";

const Shop = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProdectCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;

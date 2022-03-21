import "./product-card.styles.scss";

import { useContext } from "react/cjs/react.development";

import Button from "../custom-btn/custom-btn.component";
import { CartContext } from "../../context/cart.context";

const ProductCard = ({ product }) => {
  const { cartItems, addItemToCart } = useContext(CartContext);
  const { imageUrl, name, price } = product;

  const addProductToCart = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;

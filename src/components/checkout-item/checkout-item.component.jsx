import "./checkout-item.styles.scss";

import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";
import {
  addItemToCart,
  removeItemFromCart,
  removeItem,
} from "../../store/cart/cart.action";

const CheckOutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const clearItemHandler = () => dispatch(removeItem(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItemHandler(cartItem)}>
          &#10094;
        </div>

        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItemHandler(cartItem)}>
          &#10095;
        </div>
      </span>

      <span className="price">{price}</span>
      <span
        className="remove-button"
        onClick={() => clearItemHandler(cartItem)}
      >
        &#10005;
      </span>
    </div>
  );
};

export default CheckOutItem;

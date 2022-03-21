import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { useContext } from "react/cjs/react.development";

import { CartContext } from "../../context/cart.context";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { isCartOpen, setisCartOpen, cartCount } = useContext(CartContext);
  const toggleCart = () => {
    setisCartOpen(!isCartOpen);
  };

  return (
    <div onClick={toggleCart} className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count"> {cartCount}</span>
    </div>
  );
};

export default CartIcon;

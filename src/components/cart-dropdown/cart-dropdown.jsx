import { useContext } from "react/cjs/react.development";

import { CartContext } from "../../context/cart.context";

import "./cart-dropdown.styles.scss";
import Button from "../custom-btn/custom-btn.component";

import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button> GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;

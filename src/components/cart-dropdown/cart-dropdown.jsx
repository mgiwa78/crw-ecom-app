import { useContext } from "react/cjs/react.development";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/cart.context";

import "./cart-dropdown.styles.scss";
import Button from "../custom-btn/custom-btn.component";

import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate("/check-out");
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckout}> GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;

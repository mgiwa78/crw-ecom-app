import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";

import "./cart-dropdown.styles.scss";
import Button from "../custom-btn/custom-btn.component";

import {
  CartDropdownEmptyMessage,
  CartDropdownContainer,
  CartDropdownItems,
} from "./cart-dropdown..styles";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate("/check-out");
  };
  return (
    <CartDropdownContainer>
      <CartDropdownItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <CartDropdownEmptyMessage>
            Your Cart Is Empty
          </CartDropdownEmptyMessage>
        )}
      </CartDropdownItems>
      <Button onClick={goToCheckout}> GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;

import { useContext } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  selectIsCartOpen,
  selectCartCount,
} from "../../store/cart/cart.selector";

import { setIsCartOpen } from "../../store/cart/cart.action";
import { CartIconContainer, ItemCount } from "./cart-icon.styles";

import { ReactComponent as ShoppingSvg } from "../../assets/shopping-bag.svg";

const CartIcon = () => {
  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  console.log(isCartOpen);
  const toggleCart = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingSvg className="svg" />
      <ItemCount> {cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;

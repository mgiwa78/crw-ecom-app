import { useContext } from "react/cjs/react.development";

import { CartContext } from "../../context/cart.context";

import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
  const { isCartOpen, setisCartOpen, cartCount } = useContext(CartContext);
  const toggleCart = () => {
    setisCartOpen(!isCartOpen);
  };

  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon />
      <ItemCount> {cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;

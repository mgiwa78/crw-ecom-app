import { createContext, useState } from "react/cjs/react.development";

export const CartContext = createContext({
  isCartOpen: false,
  setDropdownState: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setisCartOpen] = useState(false);
  const value = { isCartOpen, setisCartOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

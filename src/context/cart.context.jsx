import { createContext, useEffect, useState, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => productToAdd.id === cartItem.id
  );

  if (existingCartItem) {
    return cartItems.map((cartitem) =>
      cartitem.id === productToAdd.id
        ? { ...cartitem, quantity: cartitem.quantity + 1 }
        : cartitem
    );
  }
  return [{ ...productToAdd, quantity: 1 }, ...cartItems];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const itemToRemove = cartItems.find(
    (cartItem) => cartItemToRemove.id === cartItem.id
  );

  if (itemToRemove.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  return cartItems.map((cartitem) =>
    cartitem.id === cartItemToRemove.id
      ? { ...cartitem, quantity: cartitem.quantity - 1 }
      : cartitem
  );
};

const clearItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setDropdownState: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  removeItem: () => {},
  cartTotal: 0,
  cartCount: 0,
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_STATE: "SET_CART_STATE",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_CART_STATE:
      return {
        ...state,
        isCartOpen: !payload,
      };

    default:
      throw new Error(`unhandled type of ${type} in cart reducer`);
  }
};

export const CartProvider = ({ children }) => {
  // const [isCartOpen, setisCartOpen] = useState(false);

  // const [cartItems, setcartItems] = useState([]);

  // const [cartCount, setCartCount] = useState(0);

  // const [cartTotal, setCartTotal] = useState(0);

  const [{ cartItems, cartCount, cartTotal, isCartOpen }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  // useEffect(() => {
  //   const newCartCount = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity,
  //     0
  //   );
  //   setCartCount(newCartCount);
  // }, [cartItems]);

  // useEffect(() => {
  //   const newCartTotal = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.price * cartItem.quantity,
  //     0
  //   );
  //   setCartTotal(newCartTotal);
  // }, [cartItems]);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
    console.log(cartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };
  const removeItem = (cartItemToClear) => {
    const newCartItems = clearItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setisCartOpen = () => {
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_STATE, isCartOpen));
  };

  const value = {
    isCartOpen,
    setisCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    removeItem,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

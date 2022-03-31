import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

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

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const removeItem = (cartItems, cartItemToClear) => {
  const newCartItems = clearItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_CART_STATE, boolean);

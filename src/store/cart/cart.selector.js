import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector([selectCartReducer], (cart) => {
  console.log(cart.isCartOpen);
  return cart.isCartOpen;
});

export const selectCartCount = createSelector([selectCartItems], (cartitems) =>
  cartitems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartitems) =>
  cartitems.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0
  )
);

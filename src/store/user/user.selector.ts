import { useSelector } from "react-redux";
import { UserState } from "./user.reducer";
import { createSelector } from "reselect";
import { RootState } from "../store";

export const selectCurrentReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  selectCurrentReducer,
  (User) => User.currentUser
);

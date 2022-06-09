import {
  SignUpFailed,
  SignInFailed,
  SignInSuccess,
  SignOutSuccess,
  SignOutFailed,
} from "./user.action";
import { UserData } from "../../utils/firebase/firebase.utils";
import { AnyAction } from "redux";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};
const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const UserReducer = (state = INITIAL_STATE, action: AnyAction) => {
  if (SignInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }
  if (SignOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
    };
  }
  if (
    SignInFailed.match(action) ||
    SignUpFailed.match(action) ||
    SignOutFailed.match(action)
  ) {
    return { ...state, error: action.payload };
  }
  // switch (type) {
  //   case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
  //     return {
  //       ...state,
  //       currentUser: payload,
  //     };
  //   case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
  //     return {
  //       ...state,
  //       currentUser: null,
  //     };
  //   case USER_ACTION_TYPES.SIGN_IN_FAILED:
  //   case USER_ACTION_TYPES.SIGN_UP_FAILED:
  //   case USER_ACTION_TYPES.SIGN_OUT_FAILED:
  //     return {
  //       ...state,
  //       error: payload,
  //     };

  //   default:
  return state;
};

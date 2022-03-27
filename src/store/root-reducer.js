import { combineReducers } from "redux";

import { useReducer } from "react";
import { UserReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({ user: UserReducer });

import { compose, createStore, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";

import storage from "redux-persist/lib/storage";
//root reducer
import { rootReducer } from "./root-reducer";
import thunk from "redux-thunk";
/**
 
 using currying to create a logger middlewares

 */

// const loggerMiddleWare = (store) => (next) => (action) => {
//   if (!action.type) {
//     return next(action);
//   }

//   console.log("type: ", action.type);
//   console.log("payload: ", action.payload);
//   console.log("currentState: ", store.getState());

//   next(action);

//   console.log("next state: ", store.getState());
// };

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  thunk,
].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);

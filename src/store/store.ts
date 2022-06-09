import { compose, createStore, applyMiddleware, Middleware } from "redux";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";

import storage from "redux-persist/lib/storage";
//root reducer
import { rootReducer } from "./root-reducer";
// import thunk from "redux-thunk";

import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-sagas";
/**
 
 using currying to create a logger middlewares

 */

// const loggerMiddleWare : Middleware<{},RootState>= (store) => (next) => (action) => {
//   if (!action.type) {
//     return next(action);
//   }

//   console.log("type: ", action.type);
//   console.log("payload: ", action.payload);
//   console.log("currentState: ", store.getState());

//   next(action);

//   console.log("next state: ", store.getState());
// };

// declare global{
//   interface Window{

//   }
// }

export type RootState = ReturnType<typeof rootReducer>;

export type ExtentedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV === "development" && logger,

  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

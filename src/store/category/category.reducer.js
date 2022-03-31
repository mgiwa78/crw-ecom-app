import { CATEGORIES_ACTION_TYPE } from "./category.types";
export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_DATA_START:
      return { ...state, isLoading: true };

    case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_DATA_SUCESS:
      return { ...state, categories: payload, isLoading: false };

    case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_DATA_STOP:
      return { ...state, error: payload };

    default:
      return state;
  }
};

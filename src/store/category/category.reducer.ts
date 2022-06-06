import { Category } from "./category.types";
import { AnyAction } from "redux";
import {
  fetchcategorieserror,
  fetchcategoriessuccess,
  fetchcategoriesstart,
} from "./category.action";

export type CategoryState = {
  readonly categories: Category[];
  readonly isLoading: Boolean;
  readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  // discreminating union
  // action = {} as CategoryAction
  action: AnyAction
): CategoryState => {
  if (fetchcategoriesstart.match(action)) {
    return { ...state, isLoading: true };
  }
  if (fetchcategoriessuccess.match(action)) {
    return { ...state, categories: action.payload, isLoading: false };
  }
  if (fetchcategorieserror.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }
  return state;
  // switch (action.type) {
  //   case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_DATA_START:
  //     return { ...state, isLoading: true };

  //   case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_DATA_SUCESS:
  //     return { ...state, categories: action.payload, isLoading: false };

  //   case CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_DATA_ERROR:
  //     return { ...state, error: action.payload, isLoading: false };

  //   default:
  //     return state;
  // }
};

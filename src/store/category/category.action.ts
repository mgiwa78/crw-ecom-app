import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPE, Category } from "./category.types";

import { getCategoriesAndDocument } from "../../utils/firebase/firebase.utils";

// export const setCategories = (categoriesArray) =>
// createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categoriesArray);

// export const fetchCategoriesaction = () => {
//   useEffect(() => {
//     const getCatMap = async () => {
//       const categoriesArray = await getCategoriesAndDocument("categories");
//       dispatch(setCategories(categoriesArray));
//     };
//     getCatMap();
//   }, []);
// };

export type FetchCategoriesStart =
  Action<CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_DATA_START>;

export type Fetchcategoriessuccess = ActionWithPayload<
  CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_DATA_SUCESS,
  Category[]
>;
export type FetchCategoriesError = ActionWithPayload<
  CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_DATA_ERROR,
  Error
>;

export type CategoryAction =
  | FetchCategoriesError
  | FetchCategoriesStart
  | Fetchcategoriessuccess;

export const fetchcategoriesstart = withMatcher(
  (): FetchCategoriesStart =>
    createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_DATA_START)
);

export const fetchcategoriessuccess = withMatcher(
  (categoriesArray: Category[]): Fetchcategoriessuccess =>
    createAction(
      CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_DATA_SUCESS,
      categoriesArray
    )
);

export const fetchcategorieserror = withMatcher(
  (error: Error): FetchCategoriesError =>
    createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_DATA_ERROR, error)
);

// export const fetchcategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchcategoriesstart());

//   try {
//     const categoriesArray = await getCategoriesAndDocument();
//     console.log(categoriesArray);
//     if (categoriesArray.length)
//       dispatch(fetchcategoriessuccess(categoriesArray));
//   } catch (error) {
//     dispatch(fetchcategorieserror(error));
//   }
// };

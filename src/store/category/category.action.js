import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPE } from "./category.types";

import { getCategoriesAndDocument } from "../../utils/firebase/firebase.utils";

export const setCategories = (categoriesArray) =>
  createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categoriesArray);

// export const fetchCategoriesaction = () => {
//   useEffect(() => {
//     const getCatMap = async () => {
//       const categoriesArray = await getCategoriesAndDocument("categories");
//       dispatch(setCategories(categoriesArray));
//     };
//     getCatMap();
//   }, []);
// };

export const fetchcategoriesstart = () =>
  createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_DATA_START);

export const fetchcategoriessuccess = (categoriesArray) =>
  createAction(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_DATA_SUCESS,
    categoriesArray
  );

export const fetchcategorieserror = (error) =>
  createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_DATA_ERROR, error);

export const fetchcategoriesAsync = () => async (dispatch) => {
  dispatch(fetchcategoriesstart());

  try {
    const categoriesArray = await getCategoriesAndDocument();
    console.log(categoriesArray);
    if (categoriesArray.length)
      dispatch(fetchcategoriessuccess(categoriesArray));
  } catch (error) {
    dispatch(fetchcategorieserror(error));
  }
};

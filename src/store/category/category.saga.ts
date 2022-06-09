import { takeLatest, call, all, put } from "typed-redux-saga/macro";

import { getCategoriesAndDocument } from "../../utils/firebase/firebase.utils";

import {
  fetchcategoriessuccess,
  fetchcategorieserror,
} from "./category.action";
import { CATEGORIES_ACTION_TYPE } from "./category.types";

// export const fetchcategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchcategoriesstart());

//   try {
//     const categoriesArray = await getCategoriesAndDocument();
//     console.log(categoriesArray);
//     if (categoriesArray.length)
//       yield put(fetchcategoriessuccess(categoriesArray));
//   } catch (error) {
//     yield put(fetchcategorieserror(error));
//   }
// };

export function* fetchcategoriesAsync() {
  try {
    const categoriesArray = yield* call(getCategoriesAndDocument);
    if (categoriesArray.length)
      yield put(fetchcategoriessuccess(categoriesArray));
  } catch (error) {
    yield put(fetchcategorieserror(error as Error));
  }
}
export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_DATA_START,
    fetchcategoriesAsync
  );
}
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}

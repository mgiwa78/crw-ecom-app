import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createContext, useEffect, useState } from "react";

import CategoriesPreview from "../../routes/categories-preview/categories-preview.component";
import Category from "../../routes/category/category.component";

import { getCategoriesAndDocument } from "../../utils/firebase/firebase.utils";
import {
  fetchcategoriesAsync,
  fetchcategoriesstart,
  setCategories,
} from "../../store/category/category.action";
import "./shop.styles.scss";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchcategoriesstart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;

import { createContext, useEffect, useState } from "react";

import { getCategoriesAndDocument } from "../utils/firebase/firebase.utils";

export const CategoryContext = createContext({
  categoryMap: {},
});

export const CategoryProvider = ({ children }) => {
  useEffect(() => {
    const getCatMap = async () => {
      const DATA = await getCategoriesAndDocument();
      setCategory(DATA);
    };
    getCatMap();
  }, []);

  const [categoryMap, setCategory] = useState({});

  const value = { categoryMap };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

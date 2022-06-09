// typing actions
// by converting them into enum, a static
// data data structure offered by typescirpt
export enum CATEGORIES_ACTION_TYPE {
  FETCH_CATEGORIES_DATA_SUCESS = "category/FETCH_DATA_SUCESS",
  FETCH_CATEGORIES_DATA_START = "category/FETCH_DATA_START",
  FETCH_CATEGORIES_DATA_ERROR = "category/FETCH_DATA_ERROR",
}

export type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

export type Category = {
  title: string;
  imageUrl: string;
  items: CategoryItem[];
};

export type CategoryMap = {
  [key: string]: CategoryItem[];
};

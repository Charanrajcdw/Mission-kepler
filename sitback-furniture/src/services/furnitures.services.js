import axios from "axios";
import { ROUTES } from "../constants/constants";

const furnituresAPI = axios.create({
  baseURL: ROUTES.API_URL,
});

const errorHandler = (error) => {
  console.log(error.message);
  return { data: [] };
};

export const getCategories = async () => {
  const categories = await furnituresAPI.get(ROUTES.categories).catch(errorHandler);
  return categories.data;
};

export const getProducts = async (category) => {
  const products = await furnituresAPI.get(ROUTES.products, { params: { category } }).catch(errorHandler);
  return products.data;
};

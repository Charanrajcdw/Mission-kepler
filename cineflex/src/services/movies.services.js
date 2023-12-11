import axios from "axios";
import { API_URLS } from "../constants";

const errorHandler = (error) => {
  console.log(error.message);
  return { data: [] };
};

export const getTeasers = async () => {
  const teasers = await axios.get(API_URLS.teasers).catch(errorHandler);
  return teasers.data;
};

export const getMovies = async () => {
  const movies = await axios.get(API_URLS.movies).catch(errorHandler);
  return movies.data;
};

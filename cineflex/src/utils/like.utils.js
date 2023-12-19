import { LIKES } from "../constants";
import { localStorageHelper } from "./localStorage.utils";

const { get, set } = localStorageHelper;

export const storeLikedMovie = (id) => {
  const likedMovies = get(LIKES.key) ?? [];
  if (!likedMovies.includes(id)) likedMovies.push(id);
  set(LIKES.key, likedMovies);
};

import { LIKES } from "../constants";
import { localStorageHelper } from "./localStorage.utils";

const { get, set } = localStorageHelper;

export const storeLikedMovie = (id) => {
  const likedMovies = get(LIKES.key) ?? [];
  const movieIndex = likedMovies.indexOf(id);
  if (movieIndex === -1) likedMovies.push(id);
  else likedMovies.splice(movieIndex, 1);
  set(LIKES.key, likedMovies);
};

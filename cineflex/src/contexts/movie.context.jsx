import { createContext, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { storeLikedMovie } from "../utils/like.utils";
import { UserContext } from "./user.context";
import { ROUTE_PATHS } from "../constants";

export const MovieContext = createContext({
  movies: { data: [], currentMovieIndex: -1 },
  setMovies: () => {},
  updateMovies: () => {},
});

const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState(MovieContext);
  const { isUserLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const updateMovies = useCallback(
    (id) => {
      if (isUserLoggedIn) {
        setMovies((oldData) => {
          const updateMovies = oldData.data.map((movie) => {
            if (id == movie.id) {
              storeLikedMovie(id);
              return movie.isLiked ? { ...movie, likes: +movie.likes - 1, isLiked: false } : { ...movie, likes: +movie.likes + 1, isLiked: true };
            } else {
              return movie;
            }
          });
          return { ...oldData, data: updateMovies };
        });
      } else {
        navigate(ROUTE_PATHS.login);
      }
    },
    [isUserLoggedIn, navigate]
  );

  return <MovieContext.Provider value={{ movies, setMovies, updateMovies }}>{children}</MovieContext.Provider>;
};

MovieContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default MovieContextProvider;

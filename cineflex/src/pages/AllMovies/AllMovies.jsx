import { useCallback, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import styles from "./AllMovies.module.css";
import MovieDetails from "../../containers/MovieDetails/MovieDetails";
import MoviesList from "../../containers/MoviesList/MoviesList";
import Loader from "../../components/Loader/Loader";
import { getMovies } from "../../services/movies.services";
import { localStorageHelper } from "../../utils/localStorage.utils";
import { MovieContext } from "../../contexts/movie.context";
import { LIKES } from "../../constants";

const AllMovies = () => {
  const { movies, setMovies } = useContext(MovieContext);
  const { get } = localStorageHelper;

  const fetchFn = useCallback(async () => {
    let movies = await getMovies();
    return new Promise((resolve) => {
      const likedMovies = get(LIKES.key) ?? [];
      movies = movies.map((movie) => {
        if (likedMovies.includes(movie.id)) {
          return { ...movie, likes: +movie.likes + 1, isLiked: true };
        } else {
          return movie;
        }
      });
      const movieData = { currentMovieIndex: 0, data: movies };
      setMovies(movieData);
      resolve(movieData);
    });
  }, [get, setMovies]);

  const { isLoaded } = useFetch(fetchFn, movies);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div className={styles["all-movies-container"]}>
      <MoviesList movies={movies.data} />
      <MovieDetails />
    </div>
  );
};

export default AllMovies;

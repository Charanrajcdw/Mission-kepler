import { useEffect, useState, useContext } from "react";
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
  const [isLoaded, setIsLoaded] = useState(false);
  const { get } = localStorageHelper;

  useEffect(() => {
    getMovies()
      .then((movies) => {
        const likedMovies = get(LIKES.key) ?? [];
        movies = movies.map((movie) => {
          if (likedMovies.includes(movie.id)) {
            return { ...movie, likes: +movie.likes + 1, isLiked: true };
          } else {
            return movie;
          }
        });
        setMovies({ currentMovieIndex: 0, data: movies });
        setIsLoaded(true);
      })
      .catch(() => setMovies({ currentMovieIndex: -1, data: [] }));
  }, []);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div className={styles["all-movies-container"]}>
      <MoviesList movies={movies.data} />
      <MovieDetails currentMovie={movies.data[movies.currentMovieIndex]} />
    </div>
  );
};

export default AllMovies;

import { useEffect, useState } from "react";
import styles from "./AllMovies.module.css";
import MovieDetails from "../../containers/MovieDetails/MovieDetails";
import MoviesList from "../../containers/MoviesList/MoviesList";
import Loader from "../../components/Loader/Loader";
import { getMovies } from "../../services/movies.services";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getMovies()
      .then((movies) => {
        setMovies(movies);
        setIsLoaded(true);
      })
      .catch(() => setMovies([]));
  }, []);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div className={styles["all-movies-container"]}>
      <MoviesList movies={movies} />
      <MovieDetails currentMovie={movies[0]} />
    </div>
  );
};

export default AllMovies;

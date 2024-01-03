import { useState, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./MoviesList.module.css";
import Button from "../../components/Button/Button";
import MovieCard from "../../components/MovieCard/MovieCard";
import { MOVIES_LIST } from "../../constants/container.constants";
import { MovieContext } from "../../contexts/movie.context";

const MoviesList = ({ movies }) => {
  const [moviesToShow, setMoviesToShow] = useState(MOVIES_LIST.moviesToShow);
  const { setMovies, updateMovies } = useContext(MovieContext);
  const totalMovies = movies.length;

  const handleClick = (event) => {
    if (moviesToShow < totalMovies) {
      setMoviesToShow((prevMoviesToShow) => {
        const newMovieCOunt = prevMoviesToShow + MOVIES_LIST.moviesToShow;
        if (newMovieCOunt >= totalMovies) event.target.style.display = "none";
        return newMovieCOunt;
      });
    }
  };

  const movieHandler = useCallback((index) => {
    setMovies((prevData) => {
      return { ...prevData, currentMovieIndex: index };
    });
  }, [setMovies]);

  const likeHandler = useCallback((id) => {
    updateMovies(id);
  }, [updateMovies]);

  const getMoviesContent = () => {
    let moviesContent = "";
    if (movies.length > 0) {
      moviesContent = movies.map((movie, index) => {
        if (index < moviesToShow)
          return <MovieCard key={movie.id} movieData={movie} index={index} movieHandler={movieHandler} likeHandler={likeHandler} />;
      });
    } else {
      moviesContent = MOVIES_LIST.noMovies;
    }
    return moviesContent;
  };

  return (
    <div className={styles["movies-list-container"]}>
      <h1 className={styles["movie-list-title"]}>{MOVIES_LIST.title}</h1>
      <div className={styles["movies-container"]}>{getMoviesContent()}</div>
      <Button className="trailer-btn" clickHandler={handleClick}>
        {MOVIES_LIST.button}
      </Button>
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MoviesList;

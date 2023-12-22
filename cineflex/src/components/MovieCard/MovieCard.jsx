import { memo } from "react";
import PropTypes from "prop-types";
import { FaThumbsUp } from "react-icons/fa";
import styles from "./MovieCard.module.css";
import Image from "../Image/Image";
import { MOVIE_CARDS } from "../../constants/component.constants";

const MovieCard = ({ movieData, index, movieHandler, likeHandler }) => {
  const { link, movie, likes, id, isLiked } = movieData;

  const imageClickHandler = () => {
    movieHandler(index);
  };

  const iconClickHandler = () => {
    likeHandler(id);
  };

  return (
    <div className={styles["movie-card"]}>
      <Image className="movie-img" src={link} alt={movie} clickHandler={imageClickHandler} />
      <div className={styles["movie-details"]}>
        <div>
          <p className={styles["movie-title"]}>{movie}</p>
          <p className={styles["movie-likes"]}>{likes.toString().concat(MOVIE_CARDS.likes)}</p>
        </div>
        <FaThumbsUp className={`${styles["like-icon"]} ${isLiked && styles["liked-icon"]}`} onClick={iconClickHandler} />
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  movieHandler: PropTypes.func,
  likeHandler: PropTypes.func,
};

export default memo(MovieCard);

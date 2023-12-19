import PropTypes from "prop-types";
import { FaThumbsUp } from "react-icons/fa";
import styles from "./MovieCard.module.css";
import Image from "../Image/Image";
import { MOVIE_CARDS } from "../../constants/component.constants";

const MovieCard = ({ link, movie, likes }) => {
  return (
    <div className={styles["movie-card"]}>
      <Image className="movie-img" src={link} alt={movie} />
      <div className={styles["movie-details"]}>
        <div>
          <p className={styles["movie-title"]}>{movie}</p>
          <p className={styles["movie-likes"]}>{likes.concat(MOVIE_CARDS.likes)}</p>
        </div>
        <FaThumbsUp className={styles["like-icon"]} />
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  link: PropTypes.string.isRequired,
  movie: PropTypes.string.isRequired,
  likes: PropTypes.string.isRequired,
};

export default MovieCard;

import { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { FaThumbsUp } from "react-icons/fa";
import styles from "./MovieDetails.module.css";
import Image from "../../components/Image/Image";
import withAdvertisement from "../../components/HOC/withAdvertisement";
import { MOVIE_DETAILS } from "../../constants";
import { getFormattedTime, getRandomLargeAd } from "../../utils/ad.utils";

const MovieDetails = ({ currentMovie, timer, message, isAdPlayed, showAd, showNotification, displayHandler, stopAd }) => {
  const memoizedAd = useMemo(() => getRandomLargeAd(), []);
  const { link, movie, likes, description, actors } = currentMovie;

  useEffect(() => {
    let interval;

    // start timer
    if (timer == 0 && message == "" && !isAdPlayed) {
      displayHandler(MOVIE_DETAILS.displayTime, MOVIE_DETAILS.displayContent, false);
    }
    // run remaining time for ad
    else if (timer > 0 && message == MOVIE_DETAILS.displayContent) {
      interval = setInterval(() => {
        displayHandler(timer - 1, MOVIE_DETAILS.displayContent, false);
      }, 1000);
    }
    //display ad
    else if (timer <= 0 && message == MOVIE_DETAILS.displayContent) {
      displayHandler(MOVIE_DETAILS.adTime, MOVIE_DETAILS.adContent, true);
    }
    // run remaining time for ad
    else if (timer > 0 && message == MOVIE_DETAILS.adContent) {
      interval = setInterval(() => {
        displayHandler(timer - 1, MOVIE_DETAILS.adContent, true);
      }, 1000);
    }
    //stop ad
    else if (timer <= 0 && message == MOVIE_DETAILS.adContent) {
      stopAd();
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return (
    <div className={styles["movie-details-container"]}>
      {showAd ? (
        <Image className="ad-img" src={memoizedAd} alt="ad" />
      ) : (
        <>
          <div className={styles["movie-details-header"]}>
            <div>
              <h2 className={styles["movie-title"]}>{movie}</h2>
              <p className={styles["movie-likes"]}>{likes?.concat(MOVIE_DETAILS.likes)}</p>
            </div>
            <div className={styles["like-container"]}>
              <FaThumbsUp />
            </div>
          </div>
          <Image className="movie-details-img" src={link} alt={movie} />
          <p className={styles["movie-description"]}>{description}</p>
          <h3 className={styles["actors-title"]}>{MOVIE_DETAILS.actors}</h3>
          {actors?.map((actor) => (
            <p key={actor} className={styles["movie-actor"]}>
              {actor}
            </p>
          ))}
        </>
      )}
      {showNotification && <p className={styles["ad-description"]}>{MOVIE_DETAILS.displayContent.concat(getFormattedTime(timer))}</p>}
    </div>
  );
};

MovieDetails.propTypes = {
  currentMovie: PropTypes.object,
  timer: PropTypes.number,
  message: PropTypes.string,
  showAd: PropTypes.bool,
  showNotification: PropTypes.bool,
  isAdPlayed: PropTypes.bool,
  displayHandler: PropTypes.func,
  stopAd: PropTypes.func,
};

const MovieDetailsWithAd = withAdvertisement(MovieDetails);

export default MovieDetailsWithAd;

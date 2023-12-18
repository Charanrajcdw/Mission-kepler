import { useRef } from "react";
import PropTypes from "prop-types";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import styles from "./TeaserCard.module.css";
import Image from "../Image/Image";
import sindel from "../../assets/sindel.png";
import { TEASER_CARD } from "../../constants";
import { getRandomAd } from "../../utils/ad.utils";

const TeaserCard = ({ teaser }) => {
  const { title, videoSrc } = teaser;
  const videoRef = useRef();
  const iconRef = useRef();

  const togglePlay = () => {
    videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
  };

  const playHandler = () => {
    iconRef.current.style.display = "none";
  };

  const pauseHandler = () => {
    iconRef.current.style.display = "";
  };

  return (
    <div className={styles["teaser-card"]}>
      <div className={styles["video-container"]} onClick={togglePlay}>
        <Image className="teaser-img" src={getRandomAd()} alt={title} />
        <video className={styles["teaser-video"]} poster={sindel} ref={videoRef} onPlay={playHandler} onPause={pauseHandler}>
          <source src={videoSrc} type="video/mp4" />
          {TEASER_CARD.videoWarning}
        </video>
        <span className={styles["play-icon-container"]} ref={iconRef}>
          <MdOutlinePlayCircleFilled onClick={playHandler} className={styles["play-icon"]} />
        </span>
      </div>
      <h3 className={styles["teaser-title"]}>{title}</h3>
      <p className={styles["teaser-description"]}>Advertisement in 00:05</p>
    </div>
  );
};

TeaserCard.propTypes = {
  teaser: PropTypes.object.isRequired,
};

export default TeaserCard;

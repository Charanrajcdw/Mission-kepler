import { useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import styles from "./TeaserCard.module.css";
import Image from "../Image/Image";
import withAdvertisement from "../HOC/withAdvertisement";
import sindel from "../../assets/sindel.png";
import { TEASER_CARD } from "../../constants";
import { getFormattedTime, getRandomSmallAd } from "../../utils/ad.utils";

const TeaserCard = ({ title, videoSrc, timer, message, showAd, showNotification, isAdPlayed, displayHandler, stopAd }) => {
  const videoRef = useRef();
  const iconRef = useRef();
  const memoizedAd = useMemo(() => getRandomSmallAd(), []);

  const togglePlay = () => {
    !showAd && videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
  };

  const playHandler = () => {
    if (!isAdPlayed && videoRef.current.currentTime < TEASER_CARD.contentTime)
      displayHandler(TEASER_CARD.contentTime - Math.floor(videoRef.current.currentTime), TEASER_CARD.videoContent, false);
    if (!showAd) iconRef.current.style.display = "none";
  };

  const pauseHandler = () => {
    if (!showAd) iconRef.current.style.display = "";
  };

  useEffect(() => {
    let interval;

    // run remaining time for ad
    if (timer > 0 && message == TEASER_CARD.videoContent) {
      interval = setInterval(() => {
        if (!videoRef.current.paused)
          displayHandler(TEASER_CARD.contentTime - Math.floor(videoRef.current.currentTime), TEASER_CARD.videoContent, false);
      }, 1000);
    }
    //display ad
    else if (timer <= 0 && message == TEASER_CARD.videoContent) {
      iconRef.current.style.display = "none";
      videoRef.current.pause();
      displayHandler(TEASER_CARD.adTime, TEASER_CARD.adContent, true);
    }
    // run remaining time for ad
    else if (timer > 0 && message == TEASER_CARD.adContent) {
      interval = setInterval(() => {
        displayHandler(timer - 1, TEASER_CARD.adContent, true);
      }, 1000);
    }
    //stop ad
    else if (timer <= 0 && message == TEASER_CARD.adContent) {
      videoRef.current.play();
      stopAd();
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return (
    <div className={styles["teaser-card"]}>
      <div className={styles["video-container"]} onClick={togglePlay}>
        {showAd && <Image className="teaser-img" src={memoizedAd} alt="ad" />}
        <video className={styles["teaser-video"]} poster={sindel} ref={videoRef} onPlay={playHandler} onPause={pauseHandler}>
          <source src={videoSrc} type="video/mp4" />
          {TEASER_CARD.videoWarning}
        </video>
        <span className={styles["play-icon-container"]} ref={iconRef}>
          <MdOutlinePlayCircleFilled onClick={playHandler} className={styles["play-icon"]} />
        </span>
      </div>
      <h3 className={styles["teaser-title"]}>{title}</h3>
      {showNotification && <p className={styles["teaser-description"]}>{message.concat(getFormattedTime(timer))}</p>}
    </div>
  );
};

TeaserCard.propTypes = {
  title: PropTypes.string.isRequired,
  videoSrc: PropTypes.string.isRequired,
  timer: PropTypes.number,
  message: PropTypes.string,
  showAd: PropTypes.bool,
  showNotification: PropTypes.bool,
  isAdPlayed: PropTypes.bool,
  displayHandler: PropTypes.func,
  stopAd: PropTypes.func,
};

const TeaserCardWithAd = withAdvertisement(TeaserCard);

export default TeaserCardWithAd;

import { useRef } from "react";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { NOW_SHOWING } from "../../constants";
import styles from "./NowShowing.module.css";
import sindel from "../../assets/sindel.png";

const NowShowing = () => {
  const videoRef = useRef();
  const iconRef = useRef();

  const playHandler = () => {
    iconRef.current.remove();
    videoRef.current.controls = true;
    videoRef.current.play();
  };

  return (
    <div className={styles["current-movie-container"]}>
      <h2 className={styles["page-title"]}>{NOW_SHOWING.title}</h2>
      <h1 className={styles["movie-title"]}>{NOW_SHOWING.movieTitle}</h1>
      <div className={styles["video-container"]}>
        <video className={styles["movie-video"]} poster={sindel} ref={videoRef}>
          <source src={NOW_SHOWING.videoLink} type="video/mp4" />
          {NOW_SHOWING.videoWarning}
        </video>
        <span className={styles["play-icon-container"]} ref={iconRef}>
          <MdOutlinePlayCircleFilled onClick={playHandler} className={styles["play-icon"]} />
        </span>
      </div>
      <p className={styles["movie-description"]}>{NOW_SHOWING.movieDescription}</p>
    </div>
  );
};

export default NowShowing;

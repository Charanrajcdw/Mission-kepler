import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Trailer.module.css";
import sindel from "../../assets/sindel.png";
import Image from "../Image/Image";
import Button from "../Button/Button";
import { UserContext } from "../../contexts/user.context";
import { ROUTE_PATHS, TRAILER } from "../../constants";

const Trailer = () => {
  const { isUserLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isUserLoggedIn) {
      navigate(ROUTE_PATHS.showTime);
    } else {
      navigate(ROUTE_PATHS.login);
    }
  };

  return (
    <div className={styles["trailer-container"]}>
      <h2 className={styles["trailer-title"]}>{TRAILER.title}</h2>
      {!isUserLoggedIn && (
        <p className={styles["sign-in-container"]}>
          {TRAILER.signInMsg} <Link to={ROUTE_PATHS.login}>{TRAILER.signInLink}</Link>
        </p>
      )}
      <div className={styles["movie-container"]}>
        <Image src={sindel} alt={TRAILER.movieTitle} className="trailer-img" />
        <div className={styles["movie-details-container"]}>
          <h2 className={styles["movie-title"]}>{TRAILER.movieTitle}</h2>
          <p className={styles["movie-description"]}>{TRAILER.movieDescription}</p>
          <Button className="trailer-btn" clickHandler={handleClick}>
            {TRAILER.button}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Trailer;

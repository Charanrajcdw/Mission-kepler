import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Image.module.scss";
import BrokenImage from "../../assets/blank-image.jpeg";
import { Loader } from "..";

const Image = ({ src, alt, className }) => {
  const BrokenImageHandler = (error) => {
    error.target.src = BrokenImage;
  };
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [src]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className={`${styles[className]} ${styles.imageContainer}`}>
      {!imageLoaded && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
      <img src={src || BrokenImage} alt={alt} onError={BrokenImageHandler} className={styles.img} onLoad={handleImageLoad} />
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Image;

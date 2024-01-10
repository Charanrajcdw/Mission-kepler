import PropTypes from "prop-types";
import styles from "./Image.module.scss";
import BrokenImage from "../../assets/blank-image.jpeg";

const Image = ({ src, alt, className }) => {
  const BrokenImageHandler = (error) => {
    error.target.src = BrokenImage;
  };

  return (
    <div className={styles[className]}>
      <img src={src} alt={alt} onError={BrokenImageHandler} className={styles.img} />
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Image;

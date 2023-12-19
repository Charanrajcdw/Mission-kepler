import PropTypes from "prop-types";
import styles from "./Image.module.css";
import BrokenImage from "../../assets/blank-image.jpeg";

const Image = ({ src, alt, className, clickHandler }) => {
  const BrokenImageHandler = (error) => {
    error.target.src = BrokenImage;
  };

  return (
    <div className={styles[className]}>
      <img src={src} alt={alt} onError={BrokenImageHandler} onClick={clickHandler} />
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  clickHandler: PropTypes.func,
};

export default Image;

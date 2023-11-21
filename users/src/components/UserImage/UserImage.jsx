import PropTypes from "prop-types";
import styles from "./UserImage.module.css";

function UserImage({ image, alt }) {
  return <img src={image} alt={alt} className={styles["user-image"]} />;
}

UserImage.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default UserImage;

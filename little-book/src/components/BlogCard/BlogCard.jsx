import PropTypes from "prop-types";
import styles from "./BlogCard.module.scss";

const BlogCard = ({ title, type, details, isSelected }) => {
  return (
    <div className={`${styles.blogCard} ${isSelected && styles.selected}`}>
      <h6 className={styles.blogTitle}>{title}</h6>
      <p className={styles.blogType}>{type}</p>
      <p className={styles.blogDetails}>{details}</p>
    </div>
  );
};

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default BlogCard;

import { memo } from "react";
import PropTypes from "prop-types";
import styles from "./BlogCard.module.scss";

const BlogCard = ({ blog, isSelected, blogChangeHandler }) => {
  const { title, type, details } = blog;

  const clickHandler = () => {
    blogChangeHandler(blog);
  };

  return (
    <div className={`${styles.blogCard} ${isSelected && styles.selected}`} onClick={clickHandler}>
      <h6 className={styles.blogTitle}>{title}</h6>
      <p className={styles.blogType}>{type}</p>
      <p className={styles.blogDetails}>{details}</p>
    </div>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
  }),
  isSelected: PropTypes.bool.isRequired,
  blogChangeHandler: PropTypes.func.isRequired,
};

const memoizedBlogCard = memo(BlogCard);

export default memoizedBlogCard;

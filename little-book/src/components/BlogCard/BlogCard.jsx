import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styles from "./BlogCard.module.scss";
import { blogActions } from "../../store";

const BlogCard = ({ blog, isSelected }) => {
  const { title, type, details } = blog;
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(blogActions.modifyCurrentBlog(blog));
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
  isSelected: PropTypes.bool,
};

export default BlogCard;

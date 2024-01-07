import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styles from "./BlogCard.module.scss";
import { blogActions } from "../../store";

const BlogCard = ({ blog, isSelected, modalHandler }) => {
  const { title, type, details } = blog;
  const { isEditing } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const clickHandler = () => {
    if (isEditing) {
      modalHandler(false, true);
      return;
    }
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
  isSelected: PropTypes.bool.isRequired,
  modalHandler: PropTypes.func,
};

export default BlogCard;
